import React, { useState } from 'react'
import { Dimensions, View, StyleSheet, TouchableOpacity } from 'react-native'
import {TextInput as Input} from 'react-native-paper'
import Logo from '../components/atoms/Logo'
import HeaderLogin from '../components/atoms/HeaderLogin'
import Button from '../components/atoms/Button'
import TextInput from '../components/atoms/TextInput'
import { theme } from '../core/theme'
import Paragraph from "../components/atoms/Paragraph";
const { width, height } = Dimensions.get("window");
import {Poppins_700Bold, useFonts} from "@expo-google-fonts/poppins";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from "react-i18next";
import AppBarLogin from "../components/appBars/AppBarLogin";
import Background from "../components/backgrounds/Background";

export default function SignUpScreen({ navigation }) {

    let [fontsLoaded] = useFonts({
        Poppins_700Bold
    });

    const { t } = useTranslation();
    const [firstname, setFirstname] = useState({ value: '', error: '' })
    const [lastname, setLastame] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })

    const onSignUpPressed = () => {
        let firstnameError = '';
        if (!firstname.value) firstnameError = t("NAME_CANT_EMPTY")
        let lastnameError = '';
        if (!lastname.value) lastnameError = t("NAME_CANT_EMPTY")

        let emailError = '';
        if (!email.value) emailError = t("EMAIL_CANT_EMPTY")
        if (!/\S+@\S+\.\S+/.test(email.value)) emailError = t("EMAIL_NOT_VALID")

        let passwordError = '';
        if (!password.value) passwordError = t("PWD_CANT_EMPTY")
        if (password.value.length < 5) passwordError = t("PWD_NOT_VALID")

        if (emailError || passwordError || firstnameError || lastnameError) {
            setFirstname({ ...firstname, error: firstnameError })
            setLastame({ ...lastname, error: lastnameError })
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }
        navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
        })
    }

    return (
        <Background page={'auth'}>
            <AppBarLogin goBack/>

            <KeyboardAwareScrollView style={styles.keyboardAware}>
                <View style={styles.content}>
                    <Logo />
                    <HeaderLogin>{t("START_DOODIVE_EXPERIENCE")}</HeaderLogin>
                    <TextInput
                        label={t("FIRSTNAME")}
                        returnKeyType="next"
                        value={firstname.value}
                        onChangeText={(text) => setFirstname({ value: text, error: '' })}
                        error={!!firstname.error}
                        errorText={firstname.error}
                        left={<Input.Icon name={"account"} color={theme.colors.primary}/>}
                    />
                    <TextInput
                        label={t("LASTNAME")}
                        returnKeyType="next"
                        value={lastname.value}
                        onChangeText={(text) => setLastame({ value: text, error: '' })}
                        error={!!lastname.error}
                        errorText={lastname.error}
                        left={<Input.Icon name={"account"} color={theme.colors.primary}/>}
                    />
                    <TextInput
                        label="Email"
                        returnKeyType="next"
                        value={email.value}
                        onChangeText={(text) => setEmail({ value: text, error: '' })}
                        error={!!email.error}
                        errorText={email.error}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        left={<Input.Icon name={"email"} color={theme.colors.primary}/>}
                    />
                    <TextInput
                        label="Password"
                        returnKeyType="done"
                        value={password.value}
                        onChangeText={(text) => setPassword({ value: text, error: '' })}
                        error={!!password.error}
                        errorText={password.error}
                        secureTextEntry
                        left={<Input.Icon name={"lock"} color={theme.colors.primary}/>}
                    />
                    <Button
                        mode="primary"
                        onPress={onSignUpPressed}
                        style={{ marginTop: 24 }}
                    >
                        {t("SIGN_UP")}
                    </Button>
                    <View style={styles.row}>
                        <Paragraph>{t("ALREADY_HAVE_ACCOUNT")} </Paragraph>
                        <TouchableOpacity onPress={() => navigation.replace('SignInScreen')}>
                            <Paragraph style={styles.link}>{t("LOGIN")}</Paragraph>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </Background>
    )
}

const styles = StyleSheet.create({
    keyboardAware: {
        flex: 1,
        height: height
    },
    content: {
        flex: 1,
        padding: 10,
        width: width,
        height: height,
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
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
