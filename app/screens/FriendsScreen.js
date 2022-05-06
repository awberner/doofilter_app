import React from 'react';
import {StyleSheet, View,} from 'react-native';
import Background from "../components/backgrounds/Background";
import AppBar from "../components/appBars/AppBar";
import TabBar from "../components/tabBar/TabBar";
import FriendList from "../components/friend/FriendList";


export default function FriendsScreen() {

    return (
        <View style={styles.container}>
            <Background page={'blank'}>

                <AppBar/>

                <FriendList />

                <TabBar page={'friend'}/>

            </Background>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
