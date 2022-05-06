import {Dimensions, StyleSheet, Text, View} from "react-native";
import React from "react";
import {theme} from "../../core/theme";
import {useTranslation} from "react-i18next";
const { width } = Dimensions.get("window");


export default function Empty () {

    const { t } = useTranslation();

    return (
        <View style={styles.emptyContainer}>
            <Text style={styles.empty}>{t("NO_KNOWN_FRIENDS")}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    emptyContainer: {
        height: 80,
        width: width,
        paddingVertical: 14,
        paddingLeft: 10,
        paddingRight: 14,
        backgroundColor: theme.colors.white,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 1,
        borderColor: theme.colors.gray,
        flexDirection: 'row',
        alignItems: "center"
    },
    empty: {
        width: width,
        fontSize: 13,
        fontWeight: "600",
        fontFamily: "Poppins_600SemiBold",
        textAlign: "center",
        color: theme.colors.gray
    },
});
