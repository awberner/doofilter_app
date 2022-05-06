import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../../core/theme'

import {
    useFonts,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";

export default function TextInputComponent({ errorText, description, ...props }) {

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_400Regular_Italic,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                <Input
                    style={styles.input}
                    selectionColor={theme.colors.primary}
                    activeUnderlineColor={theme.colors.primary}
                    underlineColor={'transparent'}
                    mode="Flat"
                    {...props}
                />
                {description && !errorText ? (
                    <Text style={styles.description}>{description}</Text>
                ) : null}
                {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 10,
    },
    input: {
        backgroundColor: theme.colors.white,
        fontFamily: 'Poppins_400Regular'
    },
    description: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: theme.colors.secondary,
        paddingTop: 8,
    },
    error: {
        fontSize: 15,
        color: theme.colors.error,
        paddingTop: 8,
    },
})
