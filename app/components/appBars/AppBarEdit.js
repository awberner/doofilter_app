import {Dimensions, View, SafeAreaView, StyleSheet, TouchableOpacity} from "react-native";
import GlobalStyles from "../../core/globalStyles";
import React from "react";
import AppBarBackButton from "./BackButton";
import Feather from "react-native-vector-icons/Feather";
import {theme} from "../../core/theme";
const width = Dimensions.get('window').width;


const AppBarEdit = ({goBack, reset}) => {

    return (
        <View style={styles.appbar}>
            <SafeAreaView style={[styles.container,GlobalStyles.droidSafeArea]}>
                { goBack ?
                    <AppBarBackButton/> :
                    <TouchableOpacity onPress={() => reset()}>
                        <Feather name="chevron-left" size={40} color={theme.colors.white}/>
                    </TouchableOpacity>}
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
