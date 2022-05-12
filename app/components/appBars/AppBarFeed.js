import {LinearGradient} from "expo-linear-gradient";
import {Dimensions, SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import GlobalStyles from "../../core/globalStyles";
import React, {useEffect, useState} from "react";
import AppBarLogo from "./Logo";
import AppBarBackButton from "./BackButton";
import { Entypo, MaterialCommunityIcons } from 'react-native-vector-icons';
import {theme} from "../../core/theme";
import Drawer from "../drawer/Drawer";
import {checkConnectivity} from "../functions/functions";
import {useNavigation} from "@react-navigation/native";
const width = Dimensions.get('window').width;


const AppBarFeed = ({goBack, ...props}) => {

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
                        {goBack ? <AppBarBackButton/> : false}
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
    )

}

export default AppBarFeed;


const styles = StyleSheet.create({
    appbar: {
        width: width,
        zIndex: 5,
        paddingBottom: 10
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
