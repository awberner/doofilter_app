import React from "react";
import {View, StyleSheet, Image} from 'react-native';

export default function ExportView ({imageUploaded, activeSection, ...props}) {

    return (
        <View style={[activeSection === 'export' ? {...styles.showSection, ...styles.sectionExport} : styles.section]}>
            <Image
                source={{uri: imageUploaded}}
                style={{flex: 1}}
                resizeMode="contain"
            />
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
    sectionExport: {
        backgroundColor: 'green'
    }
});
