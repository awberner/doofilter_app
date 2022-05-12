import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../../core/theme'
import {
    useFonts,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import AppLoading from "expo-app-loading";
import AnimatedSplash from "react-native-animated-splash-screen";

export default function HeaderLogin(props) {

    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
    });

    if (!fontsLoaded) {
        return <AnimatedSplash
            translucent={true}
            isLoaded={true}
            logoImage={require("../../assets/images/logo.png")}
            backgroundColor={"#262626"}
            logoHeight={500}
            logoWidth={300}
        />;
    } else {
        return <Text style={styles.header} {...props} />
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        color: theme.colors.white,
        fontWeight: 'bold',
        paddingVertical: 12,
        fontFamily: 'Poppins_700Bold',
        textAlign: "center"
    },
})
