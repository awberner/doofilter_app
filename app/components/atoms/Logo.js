import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {

    return <Image
        animation="bounceIn"
        duraton="1500"
        source={require('../../assets/images/logo.png')}
        style={styles.image} />
}

const styles = StyleSheet.create({
    image: {
        width: 280,
        height: 70,
        marginBottom: 10,
    },
})
