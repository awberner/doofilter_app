import React, {useState, useEffect} from "react";
import {Dimensions, View, StyleSheet, Image} from 'react-native';
import {theme} from "../../core/theme";
import ToolsModal from "../modals/ToolsModal";
import TabBarTools from "../tabBar/TabBarTools";
import AppBarEdit from "../appBars/AppBarEdit";
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

export default function ToolsView ({activeSection, imageUploaded, handleActiveSection, toolsModalVisible, setToolsModalVisible, ...props}) {

    const [updatedImage, setUpdatedImage] = useState(imageUploaded);

    useEffect(() => {
        if(imageUploaded) {
            setUpdatedImage(imageUploaded);
        }
    }, [imageUploaded]);


    const rotateImage = async (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        const manipResult = await manipulateAsync(
            updatedImage.uri,
            [
                { rotate: 90 },
            ],
            { base64: true, compress: 1, format: SaveFormat.JPEG }
        );
        setUpdatedImage(manipResult);
    };

    const flipImage = async (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        const manipResult = await manipulateAsync(
            updatedImage.uri,
            [
                { flip: FlipType.Horizontal },
            ],
            { base64: true, compress: 1, format: SaveFormat.JPEG }
        );
        setUpdatedImage(manipResult);
    };



    if(!updatedImage) {
        return false;
    } else {
        return (
            <View
                style={[activeSection === 'tools' ? {...styles.showSection, ...styles.sectionTools} : styles.section]}>

                <AppBarEdit reset={() => handleActiveSection('preview')}/>

                    <View style={styles.toolSection}>
                        <Image
                            source={{uri: updatedImage.uri}}
                            style={{flex: 1}}
                            resizeMode="contain"
                        />
                    </View>

                    <TabBarTools rotateImage={(e) => {rotateImage(e)}}
                                 flipImage={(e) => flipImage(e)}
                                 handleActiveSection={(e) => handleActiveSection(e)} />

                    {/*<ToolsModal isOpenModal={toolsModalVisible}
                            setModalVisible={setToolsModalVisible}
                            activeTool={activeTool}
                            setActiveTool={(e) => setActiveTool(e)} />*/}
            </View>
        );
    }
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
    sectionTools: {
        backgroundColor: 'transparent'
    },
    toolSection: {
        flex: 1
    },
    toolSectionRotate: {
        backgroundColor: theme.colors.black
    },
});

