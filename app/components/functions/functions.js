import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export async function addImage(navigation) {
    console.log(navigation);
    let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
    });

    console.log(JSON.stringify(_image));

    if (!_image.cancelled) {
        navigation.navigate('EditImageScreen', {image: _image.uri});
    }
}
