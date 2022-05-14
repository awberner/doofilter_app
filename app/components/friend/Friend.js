import React, { useState } from "react";
import {View, Text, Dimensions, TouchableOpacity, Image, StyleSheet,} from "react-native";
import Dialog from "react-native-dialog";
const { width } = Dimensions.get("screen");
import {MEDIA_SERVER_MEDIA} from '@env';
import {Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, useFonts} from "@expo-google-fonts/poppins";
import {theme} from "../../core/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import {useTranslation} from "react-i18next";
import {useNavigation} from "@react-navigation/native";
import AnimatedSplash from "react-native-animated-splash-screen";


const Friend = ({...props}) => {

    let caseList = props.case;
    let { purl, id, avatar, firstname, lastname, certification, commun } = props.friend;

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    const { t } = useTranslation();
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);

    const acceptFriend = () => {
        alert('accept friend');
    }

    const refuseFriend = () => {
        alert('refuse friend');
    }

    if (!fontsLoaded) {
        return <AnimatedSplash
            translucent={true}
            isLoaded={true}
            logoImage={require("../../assets/images/logo.png")}
            backgroundColor={"#262626"}
            logoHeight={500}
            logoWidth={300}
        />;
    } else {
        return (
            <View
                style={{
                    width: width,
                    paddingTop: 14,
                    paddingHorizontal: 14,
                    backgroundColor: theme.colors.white,
                    flexDirection: 'row',
                    alignItems: "center"
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen', {uid: id})}>
                    <Image
                        source={{uri: MEDIA_SERVER_MEDIA + avatar + '/420x'}}
                        style={{
                            height: 52,
                            width: 52,
                            borderRadius: 50 / 2,
                            marginRight: 14
                        }}
                        resizeMode="cover"
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.userInfo} onPress={() => navigation.navigate('UserProfileScreen', {uid: id})}>
                    { firstname && lastname ? <Text style={styles.name}>{firstname + " " + lastname}</Text> : false }
                    { commun ? <Text style={styles.common}>{commun} common friends</Text> : false }
                </TouchableOpacity>


                {
                    caseList === "friendList" ?
                        <View>
                            <TouchableOpacity style={styles.toggleFriend} onPress={() => setVisible(true)}>
                                <Text style={styles.toggleFriendText}>{t("FRIEND")}</Text>
                            </TouchableOpacity>
                            <Dialog.Container visible={visible}>
                                <Dialog.Title>{t("UNFRIEND")}</Dialog.Title>
                                <Dialog.Description>{t("UNFRIEND_ASK")}</Dialog.Description>
                                <Dialog.Button label="Cancel" onPress={() => setVisible(false)}/>
                                <Dialog.Button label="Unfriend"  onPress={() => setVisible(false)}/>
                            </Dialog.Container>
                        </View>:
                        <View style={styles.actions}>
                            <TouchableOpacity onPress={acceptFriend}>
                                <AntDesign name="checkcircleo" size={30} color={theme.colors.success} style={{top: 2, marginRight: 14}} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={refuseFriend}>
                                <Feather name="x-circle" size={32} color={theme.colors.error}/>
                            </TouchableOpacity>
                        </View>
                }

            </View>
        );
    }
}

export default Friend;


const styles = StyleSheet.create({
    name: {
        fontSize: 15,
        fontWeight: "600",
        fontFamily: "Poppins_600SemiBold",
        marginBottom: 2
    },
    common: {
        fontSize: 13,
        fontWeight: "500",
        fontFamily: "Poppins_500Medium"
    },
    userInfo: {
        flex: 1
    },
    toggleFriend: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: theme.colors.gray,
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginRight: 5,
    },
    toggleFriendText: {
        fontSize: 13,
        letterSpacing: 0.1,
        fontFamily: "Poppins_400Regular",
    },
    actions: {
        flexDirection: "row"
    },
});
