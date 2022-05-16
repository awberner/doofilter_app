import React from 'react';
import {StyleSheet, Dimensions, TouchableHighlight, View, TouchableOpacity, Text, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {theme} from "../../core/theme";
import Modal from "react-native-modalbox";
import * as Animatable from 'react-native-animatable';
import { addImage } from '../functions/functions';
import { useNavigation } from '@react-navigation/native';
import { EvilIcons, MaterialIcons, Feather } from 'react-native-vector-icons';
import {useTranslation} from "react-i18next";
import {
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    useFonts
} from "@expo-google-fonts/poppins";
import ProfileGridPost from "../grid/Post";
import Cover from "../cover/Cover";
import {ActivityIndicator} from "react-native-paper";

const { width, height } = Dimensions.get("window");
const WIDTH = width;
const HEIGHT = height;
const TOOL_PADDING = 4;
const LIST_PADDING = 12;
const BORDER_RADIUS = 6;
const COLUMN_COUNT = 3;
const TOOL_SIZE = (WIDTH - TOOL_PADDING * 2 - LIST_PADDING * 2) / COLUMN_COUNT;

export default function ToolsModal({isOpenModal, setModalVisible, activeTool, setActiveTool}) {

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    const { t } = useTranslation();

    const ToolsList = [
        {
            "tool" : "tune",
            "icon" : "tune"
        },
        {
            "tool" : "crop",
            "icon" : "crop"
        },
        {
            "tool" : "rotate",
            "icon" : "rotate-right"
        }
    ]

    const handleToolChange = (evt, tool) => {
        evt.preventDefault();
        evt.stopPropagation();
        setActiveTool(tool);
        setModalVisible(false);
    }


    return (
        <Modal entry={"bottom"} isOpen={isOpenModal} style={styles.modalBox} onClosed={() => setModalVisible(false)}>

            <View style={styles.modalContent}>

                <View style={styles.scrollBar} />

                <View style={styles.modalHeader}>
                    <Text style={styles.modalHeaderText}>{t("TOOLS")}</Text>
                </View>

                <View style={styles.toolList}>
                    {
                        ToolsList.map((tool, index) => {
                            return (
                                <TouchableHighlight key={index} onPress={(e) => handleToolChange(e, tool.tool)}>
                                    <View style={activeTool === tool.tool ? styles.toolItemActive : styles.toolItem}>
                                        <View style={styles.toolItemIcon}>
                                            <MaterialIcons name={tool.icon} size={44} color={activeTool === tool.tool ? theme.colors.white : theme.colors.primary}/>
                                        </View>
                                        <Text style={activeTool === tool.tool ? styles.toolItemTextActive : styles.toolItemText}>{tool.tool}</Text>
                                    </View>
                                </TouchableHighlight>
                            )
                        })
                    }
                </View>

            </View>

        </Modal>
    );
}


const styles = StyleSheet.create({
    modalBox: {
        backgroundColor: "transparent",
        alignItems: "center"
    },
    modalHeader: {
        width: '100%',
        paddingTop: 20,
        paddingBottom: 10,
        color: theme.colors.white,
        borderBottomWidth: 0,
        borderBottomColor: theme.colors.lightgray
    },
    modalHeaderText: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
        width: '100%',
        letterSpacing: 0.2,
        color: theme.colors.primary,
        fontFamily: 'Poppins_700Bold',
        textTransform: 'uppercase'
    },
    modalContent: {
        position: "absolute",
        bottom: 0,
        width: width,
        height: height * 0.32,
        alignItems: "center",
        paddingBottom: 40,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 0,
        backgroundColor: theme.colors.white
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
    toolList : {
        width: WIDTH,
        padding: LIST_PADDING,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    toolItemActive : {
        height: TOOL_SIZE,
        width: TOOL_SIZE,
        borderRadius: BORDER_RADIUS,
        padding: TOOL_PADDING,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primaryHover
    },
    toolItem : {
        height: TOOL_SIZE,
        width: TOOL_SIZE,
        borderRadius: BORDER_RADIUS,
        padding: TOOL_PADDING,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.lightgray0
    },
    toolItemIcon : {
        alignItems: 'center',
        marginBottom: 10
    },
    toolItemText : {
        fontSize: 14,
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins_500Medium',
        color: theme.colors.primary
    },
    toolItemTextActive : {
        fontSize: 14,
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins_500Medium',
        color: theme.colors.white
    },
});

