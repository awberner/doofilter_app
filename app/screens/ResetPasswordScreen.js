import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Logo from '../components/atoms/Logo'
import HeaderLogin from '../components/atoms/HeaderLogin'
import TextInput from '../components/atoms/TextInput'
import Button from '../components/atoms/Button'
import {theme} from "../core/theme";
import {TextInput as Input} from "react-native-paper";
import AppBarLogin from "../components/appBars/AppBarLogin";
import Background from "../components/backgrounds/Background";

export default function ResetPasswordScreen({ navigation }) {
    const [email, setEmail] = useState({ value: '', error: '' })

    const sendResetPasswordEmail = () => {
        let emailError = '';
        if (!email.value) emailError = t("EMAIL_CANT_EMPTY")
        if (!/\S+@\S+\.\S+/.test(email.value)) emailError = t("EMAIL_NOT_VALID")

        if (emailError) {
            setEmail({ ...email, error: emailError })
            return
        }
        navigation.navigate('LoginScreen')
    }

    return (
        <Background page={'auth'}>
            <AppBarLogin goBack/>
            <View style={styles.content}>
                <Logo />
                <HeaderLogin>Restore Password</HeaderLogin>
                <TextInput
                    label="E-mail address"
                    returnKeyType="done"
                    value={email.value}
                    onChangeText={(text) => setEmail({ value: text, error: '' })}
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    description="You will receive email with password reset link."
                    left={<Input.Icon name={"email"} color={theme.colors.primary}/>}
                />
                <Button
                    mode="primary"
                    onPress={sendResetPasswordEmail}
                    style={{ marginTop: 16 }}
                >
                    Send Instructions
                </Button>
            </View>
        </Background>
    )
}



const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 10,
        width: '95%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
