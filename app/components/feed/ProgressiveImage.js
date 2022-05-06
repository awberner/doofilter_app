import React, { useState, useRef } from "react";
import {View, Animated, Image, StyleSheet} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {theme} from "../../core/theme";
import { ActivityIndicator } from 'react-native-paper';

const ProgressiveImage = props => {
    const { source } = props;
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const fullImageAnim = useRef(new Animated.Value(0)).current;

    const setSuccessAnim = () => {
        Animated.timing(fullImageAnim, {
            duration: 0,
            toValue: 1,
            useNativeDriver: true,
        }).start(() => {
            setSuccess(true);
        });
    };

    const thumbbnailOpacity = fullImageAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
    });

    return (
        <View>
            <Animated.View>
                <Image
                    onLoad={setSuccessAnim}
                    onError={setError}
                    {...props}
                    source={source}
                    resizeMode={'contain'}
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.78)']}
                    start={{ x: 0.5, y: 0.5 }}
                    end={{ x: 0.5, y: 1 }}
                    style={styles.overlay} />
            </Animated.View>

            {success || error ? null : (
                <Animated.View style={{opacity: thumbbnailOpacity, ...styles.loaderContainer}}>
                    <ActivityIndicator
                        size={'large'}
                        animating={true} color={theme.colors.white}
                        style={styles.loader}
                    />
                </Animated.View>
            )}
        </View>
    );
};

export { ProgressiveImage };


const styles = StyleSheet.create({
    loaderContainer: {
        position: "absolute",
        top: 0,
        zIndex: 4,
        bottom: 0,
        left: 0,
        right: 0,
    },
    loader: {
        height: '100%',
        alignSelf: "center",
        paddingVertical: 50
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 5
    },
    image: {
        height: undefined,
        width: undefined,
    }
})
