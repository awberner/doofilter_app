import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

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
