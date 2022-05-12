import {Dimensions, View, SafeAreaView, StyleSheet} from "react-native";
import GlobalStyles from "../../core/globalStyles";
import React from "react";
import AppBarBackButton from "./BackButton";
const width = Dimensions.get('window').width;


const AppBarEdit = ({goBack}) => {

    return (
        <View style={styles.appbar}>
            <SafeAreaView style={[styles.container,GlobalStyles.droidSafeArea]}>
                { goBack ? <AppBarBackButton/> : false }
            </SafeAreaView>
        </View>
    )

}

export default AppBarEdit;


const styles = StyleSheet.create({
    appbar: {
        width: width,
        paddingBottom: 10,
        backgroundColor: 'transparent',
        zIndex: 5
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
    }
});
