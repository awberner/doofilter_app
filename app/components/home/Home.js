import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import Background from "../../components/backgrounds/Background";
import AppBar from "../../components/appBars/AppBar";
import TabBar from "../../components/tabBar/TabBar";
import BottomModal from "../../components/modals/BottomModal";
import {theme} from "../../core/theme";
import {ProgressiveImage} from "../feed/ProgressiveImage";
import store from "../../redux/store";
import {MEDIA_SERVER_MEDIA, MEDIA_SERVER_DOODIVE_DEFAULT} from '@env';
import { FontAwesome5 } from 'react-native-vector-icons';


export default function Home({navigation}) {

    useEffect(() => {
        console.log(store.getState());
        console.log(MEDIA_SERVER_MEDIA);
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.cover}>
                <View style={styles.coverA}>
                    <ImageBackground
                        source={{uri: MEDIA_SERVER_MEDIA + '4863256794238626a4824ba2e2'}}
                        resizeMode="cover"
                        style={styles.backgroundCoverA}
                    />
                </View>
                <View style={styles.avatar}>
                    <ImageBackground
                        source={{uri: MEDIA_SERVER_MEDIA + '4863256794238627773e7305eb'}}
                        resizeMode="cover"
                        style={styles.backgroundAvatar}
                    />
                </View>
                <View style={styles.currentUser}>
                    <Text style={styles.currentUserName}>John Doo</Text>
                </View>
            </View>
            <View style={styles.appInfoContainer}>
                <View style={styles.appInfo}>
                    <Text style={styles.appInfoTextTitle}>50</Text>
                    <Text style={styles.appInfoText}>Images Doofiltrer</Text>
                </View>
                <View style={styles.appInfo}>
                    <Text style={styles.appInfoTextTitle}>40</Text>
                    <Text style={styles.appInfoText}>Images Doofiltrer</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.buttonEdit}>
                <Text style={styles.buttonEditText}>
                    Editer votre profil sur Doodive
                </Text>

                <FontAwesome5 style={styles.buttonEditIcon} name="pencil-alt"
                              size={18} />

            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 14,
    },
    cover: {
        width: '100%',
        height: 320,
        marginTop: -10
    },
    coverA: {
        position: 'relative',
        borderRadius: 7,
        overflow: 'hidden'
    },
    backgroundCoverA: {
        width: '100%',
        paddingBottom: 170
    },
    avatar: {
        position: 'relative',
        width: 150,
        height: 150,
        borderRadius: 100,
        overflow: 'hidden',
        borderWidth: 4,
        borderColor: theme.colors.white,
        alignSelf: "center",
        position: "absolute",
        zIndex: 1,
        top: 100
    },
    backgroundAvatar: {
        width: '100%',
        paddingBottom: 170
    },
    currentUser: {
        top: 80,
        paddingTop: 14,
    },
    currentUserName: {
        textAlign: 'center',
        fontSize: 26,
        fontWeight: '600',
        color: theme.colors.white
    },
    appInfoContainer: {
        width: '100%',
        flexWrap: 'wrap',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    appInfo: {
        width: '49%',
        height: 110,
        borderRadius: 7,
        backgroundColor: theme.colors.white20,
        alignItems: "center",
        justifyContent: "center",
        padding: 14
    },
    appInfoTextTitle: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '800',
        lineHeight: 34,
        color: theme.colors.white
    },
    appInfoText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.white
    },
    buttonEdit: {
        marginTop: 10,
        marginBottom: 10,
        padding: 15,
        borderRadius: 4,
        backgroundColor: theme.colors.lightgray,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonEditText: {
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 20,
        marginRight: 6
    },
    buttonEditIcon: {
        top: -1
    },
});
