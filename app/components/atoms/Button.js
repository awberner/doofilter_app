import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../../core/theme'
import {
    useFonts,
    Poppins_700Bold
} from "@expo-google-fonts/poppins";


export default function Button({ mode, style, ...props }) {

    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
    });

    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <PaperButton
                style={[
                    styles.button,
                    mode === 'primary' && {backgroundColor: theme.colors.primary},
                    mode === 'secondary' && {backgroundColor: theme.colors.white},
                    style,
                ]}
                labelStyle={[
                    styles.text,
                    mode === 'primary' && {color: theme.colors.white},
                    mode === 'secondary' && {color: theme.colors.primary},
                ]}
                mode={mode}
                {...props}
            />
        )
    }
}

const styles = StyleSheet.create({
    button: {
        minWidth: 200,
        marginVertical: 5,
        paddingVertical: 2,
        borderRadius: 6
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
        fontFamily: 'Poppins_700Bold',
    },
})
