import React, { useState } from 'react'
import { Dimensions, TouchableOpacity, StyleSheet, View } from 'react-native'
import {TextInput as Input} from 'react-native-paper'
import Logo from '../components/atoms/Logo'
import HeaderLogin from '../components/atoms/HeaderLogin'
import Button from '../components/atoms/Button'
import TextInput from '../components/atoms/TextInput'
import { theme } from '../core/theme'
import Paragraph from "../components/atoms/Paragraph";
import {Poppins_700Bold, useFonts} from "@expo-google-fonts/poppins";
import {useTranslation} from "react-i18next";
import AuthContext from '../../AuthContext';
const { width, height } = Dimensions.get("window");
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppBarLogin from "../components/appBars/AppBarLogin";
import Background from "../components/backgrounds/Background";
import {useNavigation} from "@react-navigation/native";

export default function LoginScreen() {

    let [fontsLoaded] = useFonts({
        Poppins_700Bold
    });

    const { t } = useTranslation();
    const navigation = useNavigation();
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })

    const {signIn} = React.useContext(AuthContext);

    const onLoginPressed = () => {
        let emailError = '';
        if (!email.value) emailError = t("EMAIL_CANT_EMPTY")
        if (!/\S+@\S+\.\S+/.test(email.value)) emailError = t("EMAIL_NOT_VALID")

        let passwordError = '';
        if (!password.value) passwordError = t("PWD_CANT_EMPTY")
        if (password.value.length < 5) passwordError = t("PWD_NOT_VALID")

        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }

        signIn(email.value, password.value);
    }

    return (
        <Background page={'auth'}>
            <AppBarLogin goBack/>

            <KeyboardAwareScrollView>
                <View style={styles.content}>
                    <Logo />
                    <HeaderLogin>{t("WELCOME_BACK")}</HeaderLogin>
                    <TextInput
                        label={t("EMAIL")}
                        returnKeyType="next"
                        value={email.value}
                        onChangeText={(text) => setEmail({ value: text, error: '' })}
                        error={!!email.error}
                        errorText={email.error}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        left={<Input.Icon name={"email"} color={theme.colors.primary} />}
                    />
                    <TextInput
                        label={t("PASSWORD")}
                        returnKeyType="done"
                        value={password.value}
                        onChangeText={(text) => setPassword({ value: text, error: '' })}
                        error={!!password.error}
                        errorText={password.error}
                        secureTextEntry
                        left={<Input.Icon name={"lock"} color={theme.colors.primary}/>}
                    />
                    <View style={styles.forgotPassword}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ResetPasswordScreen')}
                        >
                            <Paragraph>{t("FORGOT_PASSWORD")}</Paragraph>
                        </TouchableOpacity>
                    </View>
                    <Button mode="primary" onPress={onLoginPressed}>{t("LOGIN")}</Button>
                    <View style={styles.row}>
                        <Paragraph>{t("DONT_HAVE_ACCOUNT")} </Paragraph>
                        <TouchableOpacity onPress={() => navigation.replace('SignUpScreen')}>
                            <Paragraph style={styles.link}>{t("SIGN_UP")}</Paragraph>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </Background>
    )
}


const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 0,
        width: '80%',
        height: height,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
    },
    link: {
        fontSize: 16,
        lineHeight: 21,
        textAlign: 'center',
        marginBottom: 12,
        fontFamily: 'Poppins_700Bold',
        fontWeight: "700",
        color: theme.colors.primary,
    },
})
