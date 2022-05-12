import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StartScreen from "./app/screens/StartScreen";
import AnimatedSplash from "react-native-animated-splash-screen";
import * as SecureStore from 'expo-secure-store';
import AuthContext from './AuthContext';
import './i18n';
import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import AuthNavigator from "./app/navigations/auth-navigator";
import AppNavigator from "./app/navigations/app-navigator";
import {signIn} from "./app/services/Members";
import store from "./app/redux/store";
import {addCurrentUser} from "./app/redux/actions";
import HomeScreen from "./app/screens/HomeScreen";
import {Dimensions, View, Text, Image} from 'react-native';

Navigation.registerComponent('StartScreen', () => gestureHandlerRootHOC(App));

export default function App() {

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        user: action.user,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        user: action.user,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        user: null,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            user: null,
            userToken: null,
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let user;
            let userToken;

            try {
                user = await SecureStore.getItemAsync('user');
                userToken = await SecureStore.getItemAsync('userToken');
            } catch (e) {
                dispatch({ type: 'SIGN_OUT'});
            }


            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({
                type: 'RESTORE_TOKEN',
                user: user,
                token: userToken
            });
        };

        bootstrapAsync();
    }, []);


    const authContext = React.useMemo(
        () => ({
            signIn: async (email, password) => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token

                signIn(email, password).then(async (data) => {
                    if(data) {
                        await SecureStore.setItemAsync('user', data.uid);
                        await SecureStore.setItemAsync('userToken', data.token);
                        store.dispatch(addCurrentUser(data));
                        dispatch({
                            type: 'SIGN_IN',
                            user: data.uid,
                            token: data.token
                        });
                        //console.log(store.getState().currentUser.avatar);
                    }
                });

            },

            signOut: async () => {
                await SecureStore.deleteItemAsync('user');
                await SecureStore.deleteItemAsync('userToken');
                dispatch({type: 'SIGN_OUT'})
            },

            signUp: async ( firstname, lastname, password ) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []
    );

    if (state.isLoading) {
        // We haven't finished checking for the token yet
        return <AnimatedSplash
            translucent={true}
            isLoaded={state.isLoading}
            logoImage={require("./app/assets/images/logo.png")}
            backgroundColor={"#262626"}
            logoHeight={500}
            logoWidth={300}
        />;
    }


    return (
        <NavigationContainer>
            <AuthContext.Provider value={authContext}>
                {state.userToken == null ?
                    <AuthNavigator /> :
                    <AppNavigator />
                }
            </AuthContext.Provider>
        </NavigationContainer>
    );
}
