import React, {useEffect, useReducer, useMemo} from 'react';
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
import {refreshCurrentUser, signIn} from "./app/services/Members";
import store from "./app/redux/store";
import {addCurrentUser, removeCurrentUser} from "./app/redux/actions";
import {checkConnectivity} from "./app/components/functions/functions";

Navigation.registerComponent('StartScreen', () => gestureHandlerRootHOC(App));

export default function App() {

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        user: action.user,
                        userToken: action.token,
                        userInfo: action.userInfo,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        user: action.user,
                        userToken: action.token,
                        userInfo: action.userInfo,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        user: null,
                        userToken: null,
                        userInfo: null,
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

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let user;
            let userToken;
            let userInfo;

            try {
                user = await SecureStore.getItemAsync('user');
                userToken = await SecureStore.getItemAsync('userToken');
                userInfo = await SecureStore.getItemAsync('userInfo');

                if(user && userToken && userInfo) {
                    await checkConnectivity().then(async (isConnected) => {
                        if (isConnected) {
                            await refreshCurrentUser(user, userToken).then((data) => {
                                if (data && data.error) {
                                    // previous user not found
                                    dispatch({type: 'SIGN_OUT'});
                                } else {
                                    // previous user logged and updated
                                    user = data.uid;
                                    userToken = data.token;
                                    userInfo = JSON.stringify(data);
                                    store.dispatch(addCurrentUser(data));
                                }
                            }).then(() => {
                                dispatch({
                                    type: 'RESTORE_TOKEN',
                                    user: user,
                                    token: userToken,
                                    userInfo: userInfo
                                });
                            });
                        } else {
                            // previous use data restored (no internet)
                            store.dispatch(addCurrentUser(JSON.parse(userInfo)));
                        }
                    });
                } else {
                    // no user saved
                    dispatch({ type: 'SIGN_OUT'});
                }
            } catch (e) {
                // error try
                dispatch({ type: 'SIGN_OUT'});
            }

            dispatch({
                type: 'RESTORE_TOKEN',
                user: user,
                token: userToken,
                userInfo: userInfo
            });

        };

        bootstrapAsync();
    }, []);


    const authContext = useMemo(
        () => ({
            signIn: async (email, password) => {
                signIn(email, password).then(async (data) => {
                    if(data) {
                        if(!data.error) {
                            store.dispatch(addCurrentUser(data));
                            //console.log(store.getState().currentUser.avatar);

                            dispatch({
                                type: 'SIGN_IN',
                                user: data.uid,
                                token: data.token
                            });
                        } else {

                        }
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
                {
                    state.isLoading ?
                        <Stack.Navigator screenOptions={{
                                headerShown: false,
                            }}>
                            <Stack.Screen name="Splash" component={
                                <AnimatedSplash
                                    translucent={true}
                                    isLoaded={state.isLoading}
                                    logoImage={require("./app/assets/images/logo.png")}
                                    backgroundColor={"#262626"}
                                    logoHeight={500}
                                    logoWidth={300}
                                /> }
                            />
                        </Stack.Navigator> :
                        state.userToken == null ?
                            <AuthNavigator /> :
                            <AppNavigator />
                }
            </AuthContext.Provider>
        </NavigationContainer>
    );
}
