import {LinearGradient} from "expo-linear-gradient";
import {Dimensions, SafeAreaView, StyleSheet} from "react-native";
import GlobalStyles from "../../core/globalStyles";
import React from "react";
import AppBarLogo from "./Logo";
import AppBarBackButton from "./BackButton";
const width = Dimensions.get('window').width;


const AppBarFeed = ({goBack}) => {

    return (
        <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={styles.appbar}>
            <SafeAreaView style={[styles.container,GlobalStyles.droidSafeArea]}>
                { goBack ? <AppBarBackButton/> : false }
                <AppBarLogo />
            </SafeAreaView>
        </LinearGradient>
    )

}

export default AppBarFeed;


const styles = StyleSheet.create({
    appbar: {
        position: "absolute",
        width: width,
        height: 119,
        zIndex: 5
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
    }
});
