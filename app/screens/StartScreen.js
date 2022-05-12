import React from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';
import HeaderLogin from "../components/atoms/HeaderLogin";
import Paragraph from "../components/atoms/Paragraph";
import ParagraphBold from "../components/atoms/ParagraphBold";
import Button from "../components/atoms/Button";
import { useTranslation } from 'react-i18next';
import * as Animatable from 'react-native-animatable';
import LogoAnimated from "../components/atoms/LogoAnimated";
import GlobalStyles from "../core/globalStyles";
import BackgroundVideo from "../components/backgrounds/BackgroundVideo";
import {StatusBar} from "expo-status-bar";


export default function StartScreen({navigation}) {

    const { t } = useTranslation();

    return (
        <BackgroundVideo>
            <StatusBar style="light" />
            <SafeAreaView style={[styles.container, GlobalStyles.droidSafeArea]}>
                <LogoAnimated />
                <Animatable.View animation="fadeInUpBig" style={styles.content}>
                    <HeaderLogin>{t('WELCOME')}</HeaderLogin>
                    <Paragraph>
                        {t('WELCOME_DESCRIPTION.0')} <ParagraphBold>{t('WELCOME_DESCRIPTION.1')}</ParagraphBold> !
                    </Paragraph>
                    <Button
                        mode="primary"
                        style={styles.button}
                        onPress={() => navigation.navigate('SignInScreen')}
                    >
                        {t("SIGN_IN")}
                    </Button>
                    <Button
                        mode="secondary"
                        style={styles.button}
                        onPress={() => navigation.navigate('SignUpScreen')}
                    >
                        {t("SIGN_UP")}
                    </Button>
                </Animatable.View>
            </SafeAreaView>
        </BackgroundVideo>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
    content: {
        maxWidth: 340,
        alignItems: 'center',
        justifyContent: "center",
        zIndex : 1,
    },
    button: {
        minWidth: 200
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
