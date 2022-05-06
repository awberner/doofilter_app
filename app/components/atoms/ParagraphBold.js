import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import {theme} from "../../core/theme";
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Poppins_700Bold
} from '@expo-google-fonts/poppins'

export default function ParagraphBold(props) {

    let [fontsLoaded] = useFonts({
        Poppins_700Bold
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return <Text style={styles.paragraphBold} {...props} />
    }

}

const styles = StyleSheet.create({
    paragraphBold: {
        fontSize: 15,
        lineHeight: 21,
        textAlign: 'center',
        marginBottom: 12,
        fontFamily: 'Poppins_700Bold',
        fontWeight: "700",
        color: theme.colors.white,
    },
})
