import React from "react";
import BackgroundBlurred from "../components/backgrounds/BackgroundBlurred";
import AppBarFeed from "../components/appBars/AppBarFeed";
import TabBar from "../components/tabBar/TabBar";
import FeedList from "../components/feed/FeedList";


export default function HomeScreen () {

    return (
        <BackgroundBlurred>

            <AppBarFeed />

            <FeedList />

            <TabBar page={'home'} />

        </BackgroundBlurred>
    );

};

