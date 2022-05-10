import React from "react";
import {SafeAreaView, View, Text} from 'react-native';
import BackgroundBlurred from "../components/backgrounds/BackgroundBlurred";
import Background from "../components/backgrounds/Background";
import AppBarEdit from "../components/appBars/AppBarEdit";
import TabBarEdit from "../components/tabBar/TabBarEdit";
import {theme} from "../core/theme";


export default function EditImageScreen (props) {

    console.log(props.route.params.image)

    return (
        <Background page={'black'}>

            <AppBarEdit goBack/>

            <View style={{flex: 1,backgroundColor: 'lightgray'}}>
                <Text style={{color: theme.colors.white}}>EditImagePage</Text>
            </View>

            <TabBarEdit page={'social'} />

        </Background>
    );

};

