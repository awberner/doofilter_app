import { createStackNavigator } from '@react-navigation/stack';

import StartScreen from '../screens/StartScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from "../screens/SignUpScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";

const Stack = createStackNavigator();

export default function AuthNavigator() {

    const config = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    };

    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });


    return (
        <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: forFade,
                transitionSpec: {
                    open: config,
                    close: config,
                }
            }}>
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        </Stack.Navigator>
    )
}
