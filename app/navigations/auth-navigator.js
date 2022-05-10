import React, { useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from "expo-secure-store";

import OnBoarding from '../screens/OnBoarding';
import StartScreen from '../screens/StartScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from "../screens/SignUpScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";

const Stack = createStackNavigator();

export default function AuthNavigator() {

    const [isFirstLaunch, setIsFirstLaunch] = useState(true);

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

    useEffect(async () => {
        let alreadyLaunched = await SecureStore.getItemAsync('alreadyLaunched');
        if(!alreadyLaunched) {
            await SecureStore.setItemAsync('alreadyLaunched', 'true');
            setIsFirstLaunch(true);
        } else {
            setIsFirstLaunch(true);
        }
    }, []);

    if(isFirstLaunch === null) {
        return null
    } else {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyleInterpolator: forFade,
                    transitionSpec: {
                        open: config,
                        close: config,
                    }
                }}>
                {
                    isFirstLaunch === true ?
                        <Stack.Screen name="Onboarding" component={OnBoarding} /> : false
                }
                <Stack.Screen name="StartScreen" component={StartScreen} />
                <Stack.Screen name="SignInScreen" component={SignInScreen} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
            </Stack.Navigator>
        )
    }
}
