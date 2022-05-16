import React, {useEffect, useState, useRef} from "react";
import { Dimensions, View, StyleSheet, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { theme } from "../../core/theme";
import Canvas, {Image as CanvasImage} from 'react-native-canvas';
import AppBarEdit from "../appBars/AppBarEdit";

const WIDTH = Dimensions.get('window').width;


export default function DoofilterView ({activeSection, handleActiveSection, imageUploaded, ...props}) {

    const [canvasContainerInfo, setCanvasContainerInfo] = useState(false);
    const CanvasRef = useRef(null);

    function find_dimesions(layout){
        const {x, y, width, height} = layout;
        setCanvasContainerInfo(layout);
    }

    const handleCanvas = (canvas) => {
        /*if(canvas) {
            const image = new CanvasImage(canvas);
            const ctx = canvas.getContext('2d');

            image.src = imageUploaded.uri;
            canvas.width = 80;
            canvas.height = 80;

            image.addEventListener('load', () => {
                debugger
                console.log('image is loaded');
                ctx.drawImage(image, 0, 0);
            });
        }*/
    }


    return (
        <View style={[activeSection === 'doofilter' ? {...styles.showSection, ...styles.sectionDoofilter} : styles.section]}>

            <AppBarEdit reset={() => handleActiveSection('preview')}/>
            {/*
                <ReactNativeZoomableView
                    maxZoom={30}
                    minZoom={1}
                    bindToBorders={true}
                >
                    <Image
                        source={{uri: imageUploaded.uri}}
                        style={{flex: 1}}
                        resizeMode="contain"
                    />
                </ReactNativeZoomableView>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <GLView style={{ width: 300, height: 300 }} onContextCreate={onContextCreate} />
                </View>

                <GLView
                    style={{ flex: 1 }}
                    onContextCreate={async context => {
                        const app = new PIXI.Application({ context });
                        const sprite = await PIXI.Sprite.fromExpoAsync(
                            'http://i.imgur.com/uwrbErh.png',
                        );
                        app.stage.addChild(sprite);
                    }}
                />
            */}

            <View style={{flex:1, backgroundColor: 'green'}} onLayout={(e) => { find_dimesions(e.nativeEvent.layout) }}>
                <Canvas style={{width:'100%', height: '100%', backgroundColor: 'yellow'}}
                        ref={handleCanvas}/>
            </View>

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

