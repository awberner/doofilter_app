import React, {useState, useEffect} from "react";
import {Dimensions, View, StyleSheet, Image} from 'react-native';
import Slider from '@react-native-community/slider';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import {theme} from "../../core/theme";

const WIDTH = Dimensions.get('window').width;

export default function DoofilterView ({activeSection, imageUploaded, ...props}) {

    //console.log(props.route.params.image)

    return (
        <View style={[activeSection === 'doofilter' ? {...styles.showSection, ...styles.sectionDoofilter} : styles.section]}>
            <ReactNativeZoomableView
                maxZoom={30}
                minZoom={1}
                bindToBorders={true}
            >
                <Image
                    source={{uri: imageUploaded}}
                    style={{flex: 1}}
                    resizeMode="contain"
                />
            </ReactNativeZoomableView>
            <View style={styles.sliderContainer}>
                <Slider
                    style={styles.slider}
                    minimumValue={-1}
                    maximumValue={1}
                    onSlidingStart={0}
                    thumbTintColor={theme.colors.white}
                    minimumTrackTintColor={theme.colors.primary}
                    maximumTrackTintColor={theme.colors.primary}
                />
            </View>
        </View>
    );

};




const styles = StyleSheet.create({
    section: {
        flex: 1,
        display: 'none',
        position: 'relative',
        justifyContent: "center",
    },
    showSection: {
        flex: 1,
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        justifyContent: "center",
    },
    sectionDoofilter: {
        backgroundColor: 'transparent'
    },
    sliderContainer: {
        backgroundColor: 'transparent',
        width: WIDTH,
        height: 70,
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0
    },
    slider: {
        paddingHorizontal: WIDTH * 0.2,
        width: WIDTH * 0.8,
        alignSelf: 'center',
    },
});
