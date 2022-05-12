import React from 'react';
import {StyleSheet, TouchableHighlight, View, Text} from 'react-native';
import {theme} from "../../core/theme";
import {Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, useFonts} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import {useTranslation} from "react-i18next";


const TabBarEdit = ({...props}) => {

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    const {t} = useTranslation();


    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <>
                <View style={{...styles.container}}>

                    <TouchableHighlight style={styles.element} onPress={() => props.handleActiveSection('doofilter')}>
                        <Text style={props.activeSection === 'doofilter' ? styles.activeStyle : styles.textStyle}>{t("DOOFILTER")}</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.element} onPress={() => props.handleActiveSection('tools')}>
                        <Text style={props.activeSection === 'tools' ? styles.activeStyle : styles.textStyle}>{t("TOOLS")}</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.element} onPress={() => props.handleActiveSection('export')}>
                        <Text style={props.activeSection === 'export' ? styles.activeStyle : styles.textStyle}>{t("EXPORT")}</Text>
                    </TouchableHighlight>

                </View>

            </>
        )
    }
}

export default TabBarEdit;


const styles = StyleSheet.create({
    container: {
        width: '100%',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 5,
        backgroundColor: theme.colors.white,
        height: 40,
        alignItems: "center",
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    element: {
        width: '100%',
        flex: 1,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'black'
    },
    textStyle: {
        fontSize: 14,
        color: theme.colors.white,
        fontFamily: 'Poppins_600SemiBold',
        textTransform: 'uppercase'
    },
    activeStyle: {
        fontSize: 14,
        color: theme.colors.primary,
        fontFamily: 'Poppins_600SemiBold',
        textTransform: 'uppercase'
    },
});
