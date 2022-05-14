import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ImageBackground, StyleSheet, Dimensions, View, Text, Image, TouchableOpacity, Linking} from "react-native";
import {Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, useFonts} from "@expo-google-fonts/poppins";
import {useNavigation} from "@react-navigation/native";
import {MEDIA_SERVER_DOODIVE_DEFAULT} from '@env';
import AuthContext from "../../../AuthContext";
import {useTranslation} from "react-i18next";
import { Button } from 'react-native-paper';
import Modal from "react-native-modal";
import {theme} from "../../core/theme";
import {expo} from '../../../app.json';
import store from "../../redux/store";

const { width, height } = Dimensions.get("window");

const Drawer = ({isDrawerOpen, setIsDrawerOpen}) => {

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    const {t, i18n} = useTranslation();
    const navigation = useNavigation();
    const lang = useTranslation()[1].language;

    const {signOut} = useContext(AuthContext);
    const [firstname, setFirstname] = useState(false);
    const [lastname, setLastname] = useState(false);
    const [coverA, setCoverA] = useState(false);
    const [avatar, setAvatar] = useState(false);

    useEffect(async () => {
        let defaultAvatar = MEDIA_SERVER_DOODIVE_DEFAULT + 'default-avatar.png';
        let defaultCover = MEDIA_SERVER_DOODIVE_DEFAULT + 'default-background.png';
        store.getState().currentUser.firstname ? setFirstname(store.getState().currentUser.firstname) : setFirstname(false);
        store.getState().currentUser.lastname ? setLastname(store.getState().currentUser.lastname) : setLastname(false);
        store.getState().currentUser.coverA ? setCoverA(store.getState().currentUser.coverA) : setCoverA(defaultCover);
        store.getState().currentUser.avatar ? setAvatar(store.getState().currentUser.avatar) : setAvatar(defaultAvatar);
    }, []);

    const translateTo = (lang) => {
        i18n.changeLanguage(lang).then(() => {
            //console.log('language changed', lang);
        });
    }

    const handleLink = (screen) => {
        setIsDrawerOpen(false);
        navigation.navigate(screen)
    }


    if(!fontsLoaded) {
        return false;
    } else {
        return (
            <Modal
                isVisible={isDrawerOpen}
                onBackdropPress={() => setIsDrawerOpen(false)} // Android back press
                onSwipeComplete={() => setIsDrawerOpen(false)} // Swipe to discard
                animationIn="slideInLeft" // Has others, we want slide in from the left
                animationOut="slideOutLeft" // When discarding the drawer
                swipeDirection="left" // Discard the drawer with swipe to left
                useNativeDriver // Faster animation
                hideModalContentWhileAnimating // Better performance, try with/without
                propagateSwipe // Allows swipe events to propagate to children components (eg a ScrollView inside a modal)
                style={styles.sideMenuStyle} // Needs to contain the width, 75% of screen width in our case
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <ImageBackground
                            source={{uri: coverA}}
                            resizeMode="cover"
                            style={styles.headerBackground}
                        >
                            <View style={styles.headerOverlay}>
                                <View style={styles.headerBottom}>
                                    <ImageBackground
                                        source={{uri: avatar}}
                                        resizeMode="cover"
                                        style={styles.avatar}
                                    />
                                    <Text style={styles.userName}>{firstname} {lastname}</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.translateContainer}>
                            <Button
                                style={styles.translateItem}
                                mode="contained"
                                color={lang === 'en' ? theme.colors.primary : theme.colors.lightgray}
                                compact={true}
                                onPress={() => translateTo('en')}>
                                <Text style={styles.translateItemText}>EN</Text>
                            </Button>
                            <Button
                                style={styles.translateItem}
                                mode="contained"
                                color={lang === 'fr' ? theme.colors.primary : theme.colors.lightgray}
                                compact={true}
                                onPress={() => translateTo('fr')}>
                                <Text style={styles.translateItemText}>FR</Text>
                            </Button>
                            <Button
                                style={styles.translateItem}
                                mode="contained"
                                color={lang === 'de' ? theme.colors.primary : theme.colors.lightgray}
                                compact={true}
                                onPress={() => translateTo('de')}>
                                <Text style={styles.translateItemText}>DE</Text>
                            </Button>
                            <Button
                                style={styles.translateItem}
                                mode="contained"
                                color={lang === 'es' ? theme.colors.primary : theme.colors.lightgray}
                                compact={true}
                                onPress={() => translateTo('es')}>
                                <Text style={styles.translateItemText}>ES</Text>
                            </Button>
                        </View>

                        <View style={styles.linksContainer}>
                            <TouchableOpacity
                                style={styles.linkButton}
                                mode="Text"
                                color={theme.colors.primary}
                                compact={false}
                                onPress={() => handleLink('HomeScreen')}>
                                <Text style={styles.linkButtonText}>{t("HOME")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.linkButton}
                                mode="Text"
                                color={theme.colors.primary}
                                compact={false}
                                onPress={() => handleLink('SocialScreen')}>
                                <Text style={styles.linkButtonText}>{t("DOODIVE")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.linkButton}
                                mode="Text"
                                color={theme.colors.primary}
                                compact={false}
                                onPress={() => {
                                    Linking.openURL('https://doodive.com/terms?lang=' + lang)
                                }}>
                                <Text style={styles.linkButtonText}>{t("TERMS_AND_CONDITIONS")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Button
                            style={styles.signOut}
                            icon="power"
                            mode="Text"
                            color="#D8181C"
                            compact={true}
                            onPress={() => signOut()}>
                            <Text style={styles.signOutText}>{t("SIGN_OUT")}</Text>
                        </Button>

                        <Text style={styles.credits}>{t("VERSION")} {expo.version}</Text>
                        <Text style={styles.credits}>{t("MADE_IN_SWITZERLAND")}</Text>
                        <Image style={styles.flag} source={require('../../assets/images/swiss_flag.jpeg')}/>
                    </View>
                    <SafeAreaView/>
                </View>
            </Modal>
        );
    }
};

export default Drawer;



const styles = StyleSheet.create({
    sideMenuStyle: {
        margin: 0,
        padding: 0,
        width: width * 0.75,
        backgroundColor: "transparent"
    },
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    safeAreaView: {
        flex: 1,
        backgroundColor: "purple"
    },
    header: {
        height: height * 0.36,
        position: 'relative'
    },
    headerBackground: {
        flex: 1,
    },
    headerOverlay: {
        padding: 12,
        flex: 1,
        backgroundColor: theme.colors.black40
    },
    headerBottom: {
        position: 'absolute',
        bottom: 12,
        left: 12
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        marginTop: 24,
        marginBottom: 10,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: theme.colors.white,
        backgroundColor: theme.colors.black,
        overflow: 'hidden'
    },
    userName: {
        fontSize: 24,
        fontFamily: 'Poppins_500Medium',
        color: theme.colors.white,
    },
    content: {
        margin: 12,
        flex: 1,
    },
    translateContainer: {
        width: '100%',
        flexDirection: 'row',
    },
    translateItem: {
        width: 40,
        height: 40,
        marginRight: 6,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: 40 / 2
    },
    translateItemText: {
        fontFamily: 'Poppins_600SemiBold',
    },
    linksContainer: {
        padding: 0,
        marginTop: 20,
    },
    linkButton: {
        margin: 0,
        paddingVertical: 12,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlign: 'left',
        borderRadius: 7
    },
    linkButtonText: {
        margin: 0,
        padding: 0,
        textAlign: 'left',
        fontFamily: 'Poppins_600SemiBold',
        textTransform: 'uppercase'
    },
    signOut: {
        width: '100%',
        fontSize: 13,
        textAlign: 'left',
        borderWidth: 2,
        borderColor: '#D8181C',
        borderRadius: 6,
        marginBottom: 12,
    },
    signOutText: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
    },
    footer: {
        width: '100%',
        padding: 12,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    credits: {
        fontSize: 12,
        textAlign: 'center',
        color: theme.colors.lightgray3,
        fontFamily: 'Poppins_600SemiBold',
    },
    flag: {
        height: 16,
        width: 22,
        marginTop: 5,
        marginHorizontal: 'auto'
    }
});
