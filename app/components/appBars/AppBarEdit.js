import {LinearGradient} from "expo-linear-gradient";
import {Dimensions, SafeAreaView, StyleSheet} from "react-native";
import GlobalStyles from "../../core/globalStyles";
import React from "react";
import AppBarBackButton from "./BackButton";
const width = Dimensions.get('window').width;


const AppBarEdit = ({goBack}) => {

    return (
        <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={styles.appbar}>
            <SafeAreaView style={[styles.container,GlobalStyles.droidSafeArea]}>
                { goBack ? <AppBarBackButton/> : false }
            </SafeAreaView>
        </LinearGradient>
    )

}

export default AppBarEdit;


const styles = StyleSheet.create({
    appbar: {
        width: width,
        paddingBottom: 10,
        zIndex: 5
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
    }
});
