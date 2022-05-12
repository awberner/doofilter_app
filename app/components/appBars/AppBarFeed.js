import {LinearGradient} from "expo-linear-gradient";
import {Dimensions, SafeAreaView, StyleSheet, View} from "react-native";
import GlobalStyles from "../../core/globalStyles";
import React, {useState} from "react";
import AppBarLogo from "./Logo";
import AppBarBackButton from "./BackButton";
import Entypo from "react-native-vector-icons/Entypo";
import {theme} from "../../core/theme";
import Drawer from "../drawer/Drawer";
const width = Dimensions.get('window').width;


const AppBarFeed = ({goBack}) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={styles.appbar}>
            <SafeAreaView style={[styles.container,GlobalStyles.droidSafeArea]}>
                { goBack ? <AppBarBackButton/> : false }
                <AppBarLogo />
                <View style={styles.rightContainer}>
                    <Entypo onPress={() => setIsDrawerOpen(!isDrawerOpen)} name="menu" size={30} color={theme.colors.white}/>
                </View>
            </SafeAreaView>

            <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={(e) => setIsDrawerOpen(e)}/>

        </LinearGradient>
    )

}

export default AppBarFeed;


const styles = StyleSheet.create({
    appbar: {
        /*position: "absolute",*/
        width: width,
        zIndex: 5,
        paddingBottom: 10
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    rightContainer: {
        marginLeft: 'auto',
        marginRight: 12
    },
});
