import React from 'react';
import Background from "../components/backgrounds/Background";
import AppBar from "../components/appBars/AppBar";
import TabBar from "../components/tabBar/TabBar";
import ProfileGrid from "../components/grid/GridList";


export default function ProfileScreen({route}) {

    return (
        <Background>

            <AppBar/>

            <ProfileGrid uid={route.params.uid} />

            <TabBar page={'profile'}/>

        </Background>
    );
}
