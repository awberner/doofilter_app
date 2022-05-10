import React from "react";
import BackgroundBlurred from "../components/backgrounds/BackgroundBlurred";
import Background from "../components/backgrounds/Background";
import AppBar from "../components/appBars/AppBar";
import TabBar from "../components/tabBar/TabBar";
import FeedList from "../components/feed/FeedList";
import Social from "../components/social/Social";


export default function HomeScreen () {

    return (
        <Background>

            <AppBar />

            <Social />

            <TabBar page={'social'} />

        </Background>
    );

};

