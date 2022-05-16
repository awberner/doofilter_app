import React from 'react';
import {StyleSheet, TouchableHighlight, TouchableOpacity, View, Text} from 'react-native';
import {theme} from "../../core/theme";
import {Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, useFonts} from "@expo-google-fonts/poppins";
import {useTranslation} from "react-i18next";
import { EvilIcons, MaterialIcons, Feather } from 'react-native-vector-icons';


const TabBarTools = ({...props}) => {

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    const {t} = useTranslation();



    if (!fontsLoaded) {
        return false;
    } else {
        return (
            <>
                <View style={{...styles.container}}>

                    <TouchableOpacity style={{...styles.element, ...styles.left}} onPress={() => props.handleActiveSection('preview')}>
                        <Text style={{...styles.textStyle, ...styles.cancel}}>{t("CANCEL")}</Text>
                    </TouchableOpacity>

                    <>
                        <TouchableOpacity style={styles.bottomTool} onPress={(e) => props.rotateImage(e)}>
                            <MaterialIcons name={'rotate-left'} size={29} color={theme.colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bottomTool} onPress={(e) => props.flipImage(e)}>
                            <MaterialIcons name={'flip'} size={29} color={theme.colors.white} />
                        </TouchableOpacity>
                    </>

                    <TouchableOpacity style={{...styles.element, ...styles.right}} onPress={() => props.handleActiveSection('preview')}>
                        <Text style={{...styles.textStyle, ...styles.save}}>{t("DONE")}</Text>
                    </TouchableOpacity>

                </View>

            </>
        )
    }
}

export default TabBarTools;


const styles = StyleSheet.create({
    container: {
        width: '100%',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 5,
        backgroundColor: 'transparent',
        paddingTop: 10,
        paddingBottom: 14,
        paddingHorizontal: 14,
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
        backgroundColor: 'transparent',
    },
    left: {
        alignItems: 'flex-start',
    },
    right: {
        alignItems: 'flex-end',
    },
    textStyle: {
        fontSize: 14,
        color: theme.colors.white,
        fontFamily: 'Poppins_500Medium',
        textTransform: 'uppercase'
    },
    bottomTool: {
        fontSize: 14,
        color: theme.colors.white,
        padding: 2,
        width: 38,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 38 / 2
    },
    cancel: {
        color: 'red',
    },
    save: {
        color: 'green',
    },
});

