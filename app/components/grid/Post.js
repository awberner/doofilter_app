import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import {MEDIA_SERVER_MEDIA} from '@env';
import {useNavigation} from "@react-navigation/native";
import {ProgressiveImage} from "./ProgressiveImage";
import {SharedElement} from "react-navigation-shared-element";

const { width, height } = Dimensions.get("window");

const GRID_PADDING = 0;
const BORDER_RADIUS = 0;
const IMAGE_SIZE = (width - GRID_PADDING * 2) / 3;


const ProfileGridPost = ({post, index, data}) => {

    const navigation = useNavigation();

    return (
        <TouchableHighlight
            onPress={() => navigation.navigate('UserFeedScreen', {posts: data, user: post.owner_uid, currentItemView: index})}>
            <View style={styles.imageContainer}>
                <SharedElement id={`index_`+post.post} >
                    <ProgressiveImage
                        source={{uri: MEDIA_SERVER_MEDIA + post.imgURL + '/420x'}}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </SharedElement>
            </View>
        </TouchableHighlight>
    )
}

export default ProfileGridPost;


const styles = StyleSheet.create({
    imageContainer: {
        height: IMAGE_SIZE,
        width: IMAGE_SIZE,
        borderRadius: BORDER_RADIUS,
        padding: GRID_PADDING,
    },
    image: {
        height: undefined,
        width: undefined,
        flex: 1,
        borderRadius: BORDER_RADIUS,
    }
});
