import * as React from 'react';
import {StatusBar} from "expo-status-bar";
import {SafeAreaView, Dimensions, StyleSheet, View} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
const { width } = Dimensions.get("window");
import {theme} from "../../core/theme";
import AuthContext from "../../../AuthContext";
import GlobalStyles from "../../core/globalStyles";
import AppBarBackButton from "./BackButton";
import AppBarLogo from "./Logo";

const AppBar = ({goBack}) => {

    const {signOut} = React.useContext(AuthContext);
    const OnPress = () => {
        signOut();
    }

    return (
        <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={styles.appbar}>
            <StatusBar style="light" />
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <View style={styles.headerContainer}>
                    <View style={styles.leftContainer}>
                        { goBack ? <AppBarBackButton/> : false }
                        <AppBarLogo />
                    </View>
                    <View style={styles.rightContainer}>
                        <Ionicons onPress={OnPress} name="settings-outline" size={25} color={theme.colors.white}/>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default AppBar;


const styles = StyleSheet.create({
    appbar: {
        backgroundColor: theme.colors.primary,
        shadowRadius: 4.65,
        shadowColor: '#000',
        shadowOpacity: 0.29,
        shadowOffset: {
            width: 0,
            height: 3
        },
        width: width,
    },
    headerContainer: {
        top: 0,
        marginBottom: 4,
        flexDirection: "row",
        alignItems: "center",
    },
    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    rightContainer: {
        right: 16,
        position: "absolute",
        flexDirection: "row",
    },
});
