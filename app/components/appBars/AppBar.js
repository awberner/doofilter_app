import React, {useState} from 'react';
import {StatusBar} from "expo-status-bar";
import {SafeAreaView, Dimensions, StyleSheet, View, TouchableOpacity} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
const { width } = Dimensions.get("window");
import {theme} from "../../core/theme";
import GlobalStyles from "../../core/globalStyles";
import AppBarBackButton from "./BackButton";
import AppBarLogo from "./Logo";
import Entypo from "react-native-vector-icons/Entypo";
import {useNavigation} from "@react-navigation/native";
import Drawer from "../drawer/Drawer";

const AppBar = ({goBack}) => {

    const navigation = useNavigation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (

        <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={styles.appbar}>
            <StatusBar style="light" />
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <View style={styles.headerContainer}>
                    <View style={styles.leftContainer}>
                        { goBack ? <AppBarBackButton/> : false }
                        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                            <AppBarLogo/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.rightContainer} onPress={() => setIsDrawerOpen(!isDrawerOpen)}>
                        <View style={styles.menuBtn}>
                            <Entypo onPress={() => setIsDrawerOpen(!isDrawerOpen)} name="menu" size={30} color={theme.colors.white}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={(e) => setIsDrawerOpen(e)}/>

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
        marginLeft: 'auto',
        marginRight: 12,
        width: 40,
        height: 40,
    },
    menuBtn: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
});
