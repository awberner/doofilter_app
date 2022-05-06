import React from 'react';
import {StyleSheet, Dimensions, ScrollView, View, TouchableOpacity, Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {theme} from "../../core/theme";
import Modal from "react-native-modalbox";
import * as Animatable from 'react-native-animatable';
const { width, height } = Dimensions.get("window");
import { EvilIcons, MaterialIcons, Feather } from 'react-native-vector-icons';
import {useTranslation} from "react-i18next";
import {
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    useFonts
} from "@expo-google-fonts/poppins";


export default function BottomModal({isOpenModal, setModalVisible}) {

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    const { t } = useTranslation();

    return (
        <Modal entry={"bottom"} isOpen={isOpenModal} style={styles.modalBox} onClosed={() => setModalVisible(false)}>

            <View style={styles.modalContent}>

                <View style={styles.scrollBar} />


                <View style={styles.modalHeader}>
                    <Text style={styles.modalHeaderText}>{t("CREATE")}</Text>
                </View>

                <View style={styles.content}>

                    <Animatable.View style={styles.menuItem} animation="fadeIn" delay={100}>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <LinearGradient colors={['#0093d6', '#0070a3']} style={styles.IconContainer}>
                                <Feather style={styles.buttonIcon} name="image" size={20} color={theme.colors.white}/>
                            </LinearGradient>
                            <View>
                                <Text style={styles.cardText}>Publication</Text>
                                <Text style={styles.cardSubText}>Publier sur le mur Doofilter</Text>
                            </View>
                        </TouchableOpacity>
                    </Animatable.View>

                    <Animatable.View style={styles.menuItem} animation="fadeIn" delay={200}>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <LinearGradient colors={['#0093d6', '#0070a3']} style={styles.IconContainer}>
                                <Feather style={styles.buttonIcon} name="camera" size={20} color={theme.colors.white}/>
                            </LinearGradient>
                            <View>
                                <Text style={styles.cardText}>Doofilter Photo</Text>
                                <Text style={styles.cardSubText}>Restore your underwater pictures</Text>
                            </View>
                        </TouchableOpacity>
                    </Animatable.View>

                    <Animatable.View style={styles.menuItem} animation="fadeIn" delay={300}>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <LinearGradient colors={['#0093d6', '#0070a3']} style={styles.IconContainer}>
                                <Feather style={styles.buttonIcon} name="video" size={19} color={theme.colors.white}/>
                            </LinearGradient>
                            <View>
                                <Text style={styles.cardText}>Doofilter Vidéo SOON</Text>
                                <Text style={styles.cardSubText}>Restore your underwater pictures</Text>
                            </View>
                        </TouchableOpacity>
                    </Animatable.View>
                </View>

            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    modalBox: {
        backgroundColor: "transparent",
        alignItems: "center",
    },
    modalHeader: {
        width: '100%',
        paddingVertical: 22,
        color: theme.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.lightgray,
    },
    modalHeaderText: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
        width: '100%',
        letterSpacing: 0.2,
        color: theme.colors.primary,
        fontFamily: 'Poppins_600SemiBold'
    },
    modalContent: {
        position: "absolute",
        bottom: 0,
        width: width,
        height: height * 0.35,
        alignItems: "center",
        paddingBottom: 40,
        borderRadius: 20,
        paddingHorizontal: 0,
        backgroundColor: theme.colors.white,
    },
    content : {
        width: '100%',
        flexWrap: "wrap",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    scrollBar : {
        width: 85,
        height: 6,
        position: "absolute",
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 10,
        zIndex: 1000,
        top: -10
    },
    menuItem:{
        width: '100%',
        position: "relative",
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.lightgray,
    },
    cardText: {
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
        color: theme.colors.black,
    },
    cardSubText: {
        fontSize: 13,
        fontFamily: 'Poppins_400Regular',
        color: theme.colors.black,
    },
    buttonContainer: {
        width: width,
        paddingVertical: 6,
        paddingHorizontal: 10,
        position: "relative",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center"
    },
    IconContainer: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        marginVertical: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderWidth: 3,
        borderColor: theme.colors.white,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 6
    },
    buttonIcon: {
        marginVertical: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
});
