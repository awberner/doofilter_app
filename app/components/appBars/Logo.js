import {Image, StyleSheet} from "react-native";
import React from "react";


export default function AppBarLogo () {
    return (
        <Image
            source={require('../../assets/images/logo.png')}
            resizeMode={"contain"}
            style={styles.logo}/>
    )
}

const styles = StyleSheet.create({
    logo: {
        height: 40,
        width: 150,
        marginTop: 14,
        marginLeft: 14,
        marginBottom: 10,
        position: "relative"
    }
});
