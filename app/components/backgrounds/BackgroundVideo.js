import { Video } from "expo-av";
import React, { useMemo } from "react";
import { Animated, StyleSheet, KeyboardAvoidingView, View } from "react-native";

export default function BackgroundVideo({ children }) {

    const opacity = useMemo(() => new Animated.Value(0), []);

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <Animated.View
                    style={[styles.backgroundViewWrapper, { opacity: opacity }]}
                >
                    <Video
                        isLooping
                        isMuted
                        positionMillis={0}
                        onLoad={() => {
                            Animated.timing(opacity, {
                                toValue: 1,
                                useNativeDriver: true,
                            }).start();
                        }}
                        resizeMode="cover"
                        shouldPlay
                        source={require('../../assets/videos/doodive.mp4')}
                        style={{ flex: 1 }}
                    />
                </Animated.View>
            </View>
            <View style={styles.overlay}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                {children}
            </KeyboardAvoidingView>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "transparent",
        flex: 1,
        justifyContent: "center",
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "black",
    },
    backgroundViewWrapper: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.45)",
    },
    title: {
        color: "white",
        fontSize: 20,
        marginTop: 90,
        paddingHorizontal: 20,
        textAlign: "center",
    },
});
