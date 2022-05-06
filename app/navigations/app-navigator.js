import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import HomeScreen from "../screens/HomeScreen";
import DoofilterScreen from "../screens/DoofilterScreen";
import FriendsScreen from "../screens/FriendsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import UserFeedScreen from "../screens/UserFeedScreen";

const Stack = createSharedElementStackNavigator();

export default function AppNavigator() {

    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="DoofilterScreen" component={DoofilterScreen} />
            <Stack.Screen name="FriendsScreen" component={FriendsScreen} initialParams={{user: undefined}} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} initialParams={{user: '6722738943958'}} />
            <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
            <Stack.Screen name="UserFeedScreen" component={UserFeedScreen}/>
        </Stack.Navigator>
    )

}
