import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Background from "../components/backgrounds/Background";
import AppBar from "../components/appBars/AppBar";
import TabBar from "../components/tabBar/TabBar";
import BottomModal from "../components/modals/BottomModal";
import {theme} from "../core/theme";


export default function DoofilterScreen({navigation}) {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Background page={'doofilter'}>
                <AppBar navigation={navigation}/>
                <View style={styles.content}>
                    <Text style={{color: theme.colors.white}}>Doofilter screen</Text>
                </View>
                <TabBar page={'doofilter'} navigation={navigation} setModalVisible={setModalVisible}/>
                <BottomModal isOpenModal={modalVisible} setModalVisible={setModalVisible}/>
            </Background>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
