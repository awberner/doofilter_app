import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native';
import { SimpleLineIcons, Entypo, Feather, Fontisto } from 'react-native-vector-icons';
import {theme} from "../../core/theme";
import {LinearGradient} from "expo-linear-gradient";
import {Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, useFonts} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import {useTranslation} from "react-i18next";
import {useNavigation} from "@react-navigation/native";
import BottomModal from "../modals/BottomModal";
import * as SecureStore from "expo-secure-store";
import {MEDIA_SERVER_DOODIVE_DEFAULT} from '@env';


const TabBarEdit = ({...props}) => {

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    const {t} = useTranslation();
    const navigation = useNavigation();
    const [uid, setUid] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(MEDIA_SERVER_DOODIVE_DEFAULT + 'default-avatar.png');
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(async () => {
        const user = await SecureStore.getItemAsync('user');
        const avatar = await SecureStore.getItemAsync('avatar');
        avatar ? setAvatarUrl(avatar) : false;
        setUid(user);
    }, []);


    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <>
                <View style={{...styles.container, ...styles.shadow}}>

                    <TouchableOpacity style={styles.element} onPress={() => navigation.navigate('HomeScreen')}>
                        <Feather style={[styles.Icon, props.page === 'home' ? styles.active : false]} name="home"
                                 size={25}
                                 color={theme.colors.primary}/>
                        <Text style={{marginTop: 6, ...styles.textStyle}}>{t("HOME")}</Text>
                    </TouchableOpacity>
                    {/*
                    <TouchableOpacity style={styles.element} onPress={() => navigation.navigate('DoofilterScreen')}>
                        <Feather name="bell" size={25} color={theme.colors.primary}/>
                        <Text style={{marginTop: 7, ...styles.textStyle}}>Social</Text>
                    </TouchableOpacity>
                    */}

                    <TouchableOpacity
                        style={{...styles.addBtn, ...styles.shadow}}
                        onPress={() => setModalVisible(true)}>
                        <LinearGradient
                            colors={['#0093d6', '#0070a3']}
                            style={styles.addBtnContent}>
                            <Entypo name="plus" size={50} color={theme.colors.white}/>
                        </LinearGradient>
                    </TouchableOpacity>
                    {/*
                    <TouchableOpacity style={styles.element} onPress={() => navigation.navigate('FriendsScreen')}>
                        <SimpleLineIcons style={props.page === 'friend' ? styles.active : false} name="people" size={25}
                                         color={theme.colors.primary}/>
                        <Text style={{marginTop: 7, ...styles.textStyle}}>{t("FRIENDS")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.element} onPress={() => navigation.navigate('ProfileScreen', {uid: uid})}>
                        <Image style={props.page === 'profile' ? styles.profileImageActive : styles.profilImage}
                               source={{uri: avatarUrl}}/>
                        <Text style={{marginTop: 0, ...styles.textStyle}}>{t("ME")}</Text>
                    </TouchableOpacity>

                    */}

                    <TouchableOpacity style={styles.element} onPress={() => navigation.navigate('SocialScreen')}>
                        <Fontisto style={props.page === 'social' ? styles.active : false} name="world" size={25}
                                  color={theme.colors.primary}/>
                        <Text style={{marginTop: 7, ...styles.textStyle}}>{t("DOODIVE")}</Text>
                    </TouchableOpacity>


                </View>

                <BottomModal isOpenModal={modalVisible} setModalVisible={setModalVisible}/>

            </>
        )
    }
}

export default TabBarEdit;


const styles = StyleSheet.create({
    container: {
        width: '100%',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 5,
        backgroundColor: theme.colors.white,
        height: 90,
        paddingTop: 14,
        paddingBottom: 4,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 0
    },
    element: {
        width: '100%',
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        top: -14,
    },
    addBtn: {
        width: '24%',
        top: -34,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addBtnContent: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 23,
        backgroundColor: theme.colors.primary
    },
    active: {
        color: theme.colors.primaryHover,
        shadowColor: theme.colors.primaryHover,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.7,
        shadowRadius: 1,
        elevation: 8
    },
    profilImage: {
        top: -1,
        width: 34,
        height: 34,
        borderRadius: 34 / 2,
        borderWidth: 2,
        borderColor: theme.colors.white
    },
    profileImageActive: {
        top: -1,
        width: 34,
        height: 34,
        borderRadius: 34 / 2,
        borderWidth: 2,
        shadowColor: theme.colors.primaryHover,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.7,
        shadowRadius: 1,
        borderColor: theme.colors.primaryHover
    },
    textStyle: {
        fontSize: 12,
        color: theme.colors.black,
        fontFamily: 'Poppins_600SemiBold',
    },
});
