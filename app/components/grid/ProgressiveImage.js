import React, { useState, useRef } from "react";
import {View, Animated, Image, StyleSheet} from "react-native";
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
                    resizeMode={'cover'}
                />
            </Animated.View>

            {success || error ? null : (
                <Animated.View style={{opacity: thumbbnailOpacity, ...styles.loaderContainer}}>
                    <ActivityIndicator
                        size={'small'}
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
    image: {
        height: undefined,
        width: undefined,
    }
})
