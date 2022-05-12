import React, {useEffect, useState} from 'react';
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
import {MaterialCommunityIcons} from "react-native-vector-icons";
import {checkConnectivity} from "../functions/functions";

const AppBar = ({goBack, ...props}) => {

    const navigation = useNavigation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        checkConnectivity().then((isConnected) => {
            setIsConnected(isConnected);
        });
    }, [props, navigation]);

    return (
        <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={styles.appbar}>
            <SafeAreaView style={[styles.container, GlobalStyles.droidSafeArea]}>
                <View style={styles.headerContainer}>
                    <View style={styles.leftContainer}>
                        { goBack ? <AppBarBackButton/> : false }
                        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                            <AppBarLogo/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rightContainer}>
                        {
                            !isConnected ?
                                <MaterialCommunityIcons style={{marginRight: 6}} name="wifi-off" size={23} color={theme.colors.error}/> : false
                        }
                        <Entypo onPress={() => setIsDrawerOpen(!isDrawerOpen)} name="menu" size={30}
                                color={theme.colors.white}/>
                    </View>
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
    container: {
        flexDirection: "row",
        alignItems: "center",
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
        flex: 1
    },
    rightContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 12
    },
});
