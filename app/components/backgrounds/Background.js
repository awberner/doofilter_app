import React from 'react'
import { ImageBackground, StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

export default function Background({ children , ...props}) {

    switch (props.page) {
        case 'auth':
            return (
                <LinearGradient
                    colors={['#0093d6', '#1F4264']}
                    style={styles.background}>
                    <ImageBackground
                        source={require('../../assets/images/backgroundProfile.jpg')}
                        resizeMode="cover"
                        style={styles.background}
                    >
                        <View style={styles.overlay}/>
                        <KeyboardAvoidingView style={styles.container} behavior="padding">
                            {children}
                        </KeyboardAvoidingView>
                    </ImageBackground>
                </LinearGradient>
            )
            break;

        case 'color':
            return (
                <LinearGradient
                    colors={['#0093d6', '#1F4264']}
                    style={styles.background}>
                    <KeyboardAvoidingView style={styles.container} behavior="padding">
                        {children}
                    </KeyboardAvoidingView>
                </LinearGradient>
            )
            break;
        case 'blank':
            return (
                <LinearGradient
                    colors={['#FFF', '#FDFDFD']}
                    style={styles.background}>
                    <KeyboardAvoidingView style={styles.container} behavior="padding">
                        {children}
                    </KeyboardAvoidingView>
                </LinearGradient>
            )
            break;
        default:
            return (
                <LinearGradient
                    colors={['#0093d6', '#1F4264']}
                    style={styles.background}>
                    <ImageBackground
                        source={require('../../assets/images/backgroundProfile.jpg')}
                        resizeMode="cover"
                        style={styles.background}
                    >
                        <View style={styles.overlay}/>
                        <KeyboardAvoidingView style={styles.container} behavior="padding">
                            {children}
                        </KeyboardAvoidingView>
                    </ImageBackground>
                </LinearGradient>
            )
            break;
    }
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        backgroundColor: '#000'
    },
    container: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)'
    }
})
