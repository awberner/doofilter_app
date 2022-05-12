import React from "react";
import Background from "../components/backgrounds/Background";
import AppBarFeed from "../components/appBars/AppBarFeed";
import TabBar from "../components/tabBar/TabBar";
import Home from "../components/home/Home";


export default function HomeScreen () {

    return (
        <Background page={'home'}>

            <AppBarFeed />

            <Home />

            <TabBar page={'home'} />

        </Background>
    );

};

