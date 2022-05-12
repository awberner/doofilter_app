import React, { useState, useEffect } from 'react';
import { Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from '@react-navigation/native';



/* ================================================================== */
/* CHECK CONNECTIVITY                                                 */
/* ================================================================== */

export function checkConnectivity() {
    return new Promise((resolve) => {
        NetInfo.fetch().then((state) => {
            //console.log("Connection type", state.type);
            //console.log("Is connected?", state.isConnected);
            resolve(state.isConnected);
        });
    });
};


/* ================================================================== */
/* ADD IMAGE                                                          */
/* ================================================================== */

export async function addImage2(navigation) {
    let _image = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
    });

    //console.log(JSON.stringify(_image));

    if (!_image.cancelled && _image.uri) {
        navigation.navigate('EditImageScreen', {image: _image.uri});
    }
}

export async function addImage(navigation) {
    let _image = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
    });

    //console.log(JSON.stringify(_image));

    if (!_image.cancelled && _image.uri) {
        navigation.navigate('EditImageScreen', {image: `data:image/jpg;base64,${_image.base64}`});
    }
}
