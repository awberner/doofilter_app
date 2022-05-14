import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, ScrollView, View, Text, ImageBackground, TouchableOpacity, Dimensions, Linking} from 'react-native';
import {Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, useFonts} from "@expo-google-fonts/poppins";
import {MEDIA_SERVER_MEDIA, MEDIA_SERVER_DOODIVE_DEFAULT} from '@env';
import { FontAwesome } from 'react-native-vector-icons';
import {useTranslation} from "react-i18next";
import CustomDrawer from "../drawer/Drawer";
import AuthContext from "../../../AuthContext";
import {theme} from "../../core/theme";
import store from "../../redux/store";
const { width, height } = Dimensions.get("window");
const WIDTH = width;


export default function Home({}) {

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    const {t} = useTranslation();
    const {signOut} = useContext(AuthContext);
    const [firstname, setFirstname] = useState(false);
    const [lastname, setLastname] = useState(false);
    const [coverA, setCoverA] = useState(MEDIA_SERVER_MEDIA + false);
    const [coverB1, setCoverB1] = useState(false);
    const [coverB2, setCoverB2] = useState(false);
    const [avatar, setAvatar] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [autologLink, setAutologLink] = useState('link');

    useEffect(async () => {
        setLoaded(true);
    }, []);

    async function loadUser() {
        let defaultAvatar = MEDIA_SERVER_DOODIVE_DEFAULT + 'default-avatar.png';
        let defaultCover = MEDIA_SERVER_DOODIVE_DEFAULT + 'default-background.png';
        if (await store.getState().currentUser) {
            store.getState().currentUser.firstname ? setFirstname(store.getState().currentUser.firstname) : setFirstname(false);
            store.getState().currentUser.lastname ? setLastname(store.getState().currentUser.lastname) : setLastname(false);
            store.getState().currentUser.coverA ? setCoverA(store.getState().currentUser.coverA) : setCoverA(defaultCover);
            store.getState().currentUser.coverB1 ? setCoverB1(store.getState().currentUser.coverB1) : setCoverB1(defaultCover);
            store.getState().currentUser.coverB2 ? setCoverB2(store.getState().currentUser.coverB2) : setCoverB2(defaultCover);
            store.getState().currentUser.avatar ? setAvatar(store.getState().currentUser.avatar) : setAvatar(defaultAvatar);
        } else {
            signOut();
        }
    }

    useEffect(async () => {
        loaded ? await loadUser() : false;
    }, [loaded]);

    if (!fontsLoaded) {
        return false;
    } else {
        return (
            <>
                <CustomDrawer />
                <ScrollView style={styles.container}>
                    <View style={styles.cover}>
                        <View style={styles.coverA}>
                            <ImageBackground
                                source={{uri: coverA}}
                                resizeMode="cover"
                                style={styles.coverA1}
                            />
                        </View>

                        <View style={styles.coverB}>
                            <ImageBackground
                                source={{uri: coverB1}}
                                resizeMode="cover"
                                style={styles.coverB1}
                            />
                            <ImageBackground
                                source={{uri: coverB2}}
                                resizeMode="cover"
                                style={styles.coverB2}
                            />
                        </View>

                        <View style={styles.avatar}>
                            <ImageBackground
                                source={{uri: avatar}}
                                resizeMode="cover"
                                style={styles.backgroundAvatar}
                            />
                        </View>
                    </View>

                    {
                        firstname || lastname ?
                            <View style={styles.currentUser}>
                                <Text style={styles.currentUserName}>{firstname} {lastname}</Text>
                            </View> : false
                    }

                    {
                        autologLink ?
                            <TouchableOpacity style={styles.buttonEdit} onPress={() => {
                                Linking.openURL(autologLink)
                            }}>
                                <Text style={styles.buttonEditText}>{t("EDIT_ON_DOODIVE")}</Text>
                                <FontAwesome style={styles.buttonEditIcon} name="pencil" size={24}
                                             color={theme.colors.white}/>
                            </TouchableOpacity> : false
                    }

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
                </ScrollView>
            </>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        paddingBottom: 14,
        paddingHorizontal: 14,
    },
    cover: {
        width: WIDTH - 28,
        padding: 0,
    },
    coverA: {
        height: (WIDTH - 28) * 0.4,
        position: 'relative',
        borderRadius: 7,
        marginBottom: 2,
        overflow: 'hidden'
    },
    coverA1: {
        flex: 1
    },
    coverB: {
        height: (WIDTH - 28) * 0.4,
        position: 'relative',
        borderRadius: 7,
        overflow: 'hidden',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 2,
    },
    coverB1: {
        flex: 1,
        position: 'relative',
        borderRadius: 7,
        overflow: 'hidden',
        marginRight: 2
    },
    coverB2: {
        flex: 1,
        position: 'relative',
        borderRadius: 7,
        overflow: 'hidden',
        marginLeft: 2,
    },
    avatar: {
        width: 162,
        height: 162,
        borderRadius: 100,
        overflow: 'hidden',
        borderWidth: 4,
        borderColor: 'black',
        backgroundColor: 'black',
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        zIndex: 1,
        top: (WIDTH - 28) * 0.16,
    },
    backgroundAvatar: {
        width: '100%',
        paddingBottom: 170,
        alignItems: 'center',
        justifyContent: 'center'
    },
    currentUser: {
        paddingVertical: 16,
    },
    currentUserName: {
        textAlign: 'center',
        fontSize: 26,
        fontWeight: '600',
        fontFamily: 'Poppins_600SemiBold',
        color: theme.colors.white
    },
    appInfoContainer: {
        width: '100%',
        flexWrap: 'wrap',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30
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
        marginBottom: 10,
        padding: 15,
        borderRadius: 7,
        backgroundColor: theme.colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonEditText: {
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 20,
        marginRight: 10,
        color: theme.colors.white,
        fontFamily: 'Poppins_600SemiBold',
    },
    buttonEditIcon: {
        top: -1
    },
});
