import React, {useState, useEffect} from "react";
import {Dimensions, View, StyleSheet, Image} from 'react-native';
import {theme} from "../../core/theme";
import ToolsModal from "../modals/ToolsModal";

export default function ToolsView ({activeSection, imageUploaded, toolsModalVisible, setToolsModalVisible, ...props}) {

    return (
        <View style={[activeSection === 'tools' ? {...styles.showSection, ...styles.sectionTools} : styles.section]}>
            <Image
                source={{uri: imageUploaded}}
                style={{flex: 1}}
                resizeMode="contain"
            />
            <ToolsModal  isOpenModal={toolsModalVisible} setModalVisible={setToolsModalVisible}/>
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
    sectionTools: {
        backgroundColor: theme.colors.lightgray
    },
});
