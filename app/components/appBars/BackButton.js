import React from "react";
import {TouchableOpacity} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {theme} from "../../core/theme";
import {useNavigation} from "@react-navigation/native";


export default function AppBarBackButton () {

    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={navigation.goBack}>
            <Feather name="chevron-left" size={40} color={theme.colors.white}/>
        </TouchableOpacity>
    )
}
