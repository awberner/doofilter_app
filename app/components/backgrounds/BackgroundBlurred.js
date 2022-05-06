import React from 'react'
import { Dimensions, StyleSheet, ImageBackground, View } from 'react-native'
import {StatusBar} from "expo-status-bar";
const width = Dimensions.get('window').width;
import { BlurView } from 'expo-blur';

export default function BackgroundBlurred ({ children }) {
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <ImageBackground
                source={require('../../assets/images/backgroundProfile.jpg')}
                resizeMode="cover"
                style={styles.background}
            >
                <View style={styles.overlay} />
                <BlurView intensity={10} tint="dark" style={styles.blurContainer} />
                <View style={styles.content}>{children}</View>
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    background: {
        flex: 1,
        width: width,
    },
    content: {
        flex: 1,
        width: width,
        alignSelf: 'center',
        alignItems: 'center',
    },
    blurContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
})
