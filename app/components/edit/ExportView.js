import React from "react";
import {View, StyleSheet, Image} from 'react-native';
import AppBarEdit from "../appBars/AppBarEdit";

export default function ExportView ({imageUploaded, activeSection, handleActiveSection, ...props}) {

    if(!imageUploaded) {
        return false;
    } else {
        return (
            <View style={[activeSection === 'export' ? {...styles.showSection, ...styles.sectionExport} : styles.section]}>

                <AppBarEdit reset={() => handleActiveSection('preview')}/>

                <Image
                    source={{uri: imageUploaded.uri}}
                    style={{flex: 1}}
                    resizeMode="contain"
                />
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
    sectionExport: {
        backgroundColor: 'green'
    }
});
