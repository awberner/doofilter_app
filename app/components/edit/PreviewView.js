import React from "react";
import {SafeAreaView, View, StyleSheet, Image} from 'react-native';
import AppBarEdit from "../appBars/AppBarEdit";

export default function PreviewView ({imageUploaded, activeSection, ...props}) {

    if(!imageUploaded) {
        return false;
    } else {
        return (
            <View
                style={[activeSection === 'preview' ? {...styles.showSection, ...styles.sectionPreview} : styles.section]}>
                <AppBarEdit goBack/>

                <SafeAreaView style={styles.safeArea}>
                    <View
                        style={[activeSection === 'preview' ? {...styles.showSection, ...styles.sectionExport} : styles.section]}>
                        <Image
                            source={{uri: imageUploaded.uri}}
                            style={{flex: 1}}
                            resizeMode="contain"
                        />
                    </View>
                </SafeAreaView>
            </View>
        );
    }
};




const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
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
    sectionPreview: {
        backgroundColor: 'transparent'
    },
    sectionExport: {
        backgroundColor: 'green'
    }
});

