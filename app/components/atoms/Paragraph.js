import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import {theme} from "../../core/theme";
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Poppins_400Regular,
} from '@expo-google-fonts/poppins'

export default function Paragraph(props) {

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return <Text style={styles.paragraph} {...props} />
    }
}

const styles = StyleSheet.create({
    paragraph: {
        fontSize: 15,
        lineHeight: 21,
        textAlign: 'center',
        marginBottom: 12,
        fontFamily: 'Poppins_400Regular',
        color: theme.colors.white,
    },
})
