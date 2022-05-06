import * as React from 'react';
import {StatusBar} from "expo-status-bar";
import {SafeAreaView, Dimensions, StyleSheet, View, TouchableOpacity} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
const { width } = Dimensions.get("window");
import GlobalStyles from "../../core/globalStyles";
import {useNavigation} from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import {theme} from "../../core/theme";

const AppBarLogin = ({goBack}) => {

    const navigation = useNavigation();

    return (
        <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={styles.appbar}>
            <StatusBar style="light" />
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <View style={styles.headerContainer}>
                    { goBack ?
                        <TouchableOpacity onPress={() => navigation.navigate('StartScreen')}>
                            <Feather name="chevron-left" size={40} color={theme.colors.white}/>
                        </TouchableOpacity> : false }
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default AppBarLogin;


const styles = StyleSheet.create({
    appbar: {
        paddingHorizontal: 4,
        shadowRadius: 4.65,
        shadowColor: '#000',
        shadowOpacity: 0.29,
        shadowOffset: {
            width: 0,
            height: 3
        },
        width: width,
        zIndex: 1,
        position: "absolute",
        top: 0
    },
    headerContainer: {
        top: 0,
        marginBottom: 4,
        flexDirection: "row",
        alignItems: "center",
    },
});
