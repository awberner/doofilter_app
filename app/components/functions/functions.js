import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import NetInfo from "@react-native-community/netinfo";



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

export async function addImage(navigation , toBase64 = false) {
    let _image = await ImagePicker.launchImageLibraryAsync({
        base64: toBase64,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
    });

    //console.log(JSON.stringify(_image));

    if (!_image.cancelled && _image.uri) {
        navigation.navigate('EditImageScreen', {image: _image});
    }
}

