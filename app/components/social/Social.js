import React from 'react';
import {StyleSheet, View, Text, Dimensions, TouchableOpacity, Linking} from 'react-native';
import {theme} from "../../core/theme";
import { FontAwesome, Feather, FontAwesome5 } from 'react-native-vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { addImage } from '../functions/functions';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

const GRID_PADDING = 6;
const BORDER_RADIUS = 60;
const LOGO_SIZE = 26;
const IMAGE_SIZE = (width - 28 - GRID_PADDING * 2) / 4;

export default function Social() {

    const navigation = useNavigation();
    const socialMedia = [
        {
            'name': 'Facebook',
            'link': 'https://www.facebook.com/Doodive/',
            'icon': 'facebookIcon'
        },
        /*{
            'name': 'TikTok',
            'link': 'https://www.tiktok.com/@doodive',
            'icon': 'tiktokIcon'
        },*/
        {
            'name': 'Instagram',
            'link': 'https://www.instagram.com/doodive_official/',
            'icon': 'instagramIcon'
        },
        {
            'name': 'YouTube',
            'link': 'https://www.youtube.com/channel/UC-xHpX5flsRcgTVcwZ3dCoA',
            'icon': 'youtubeIcon'
        },
    ];


    return (
        <View style={styles.container}>

            <Text style={styles.title}>Doodive{'\u00AE'}</Text>
            <View style={styles.actionContent}>
                <TouchableOpacity onPress={() => addImage(navigation)} style={styles.actionItemContainer}>
                    <LinearGradient colors={['#2a93d5', '#195f80']} style={styles.actionItem}>
                        <Feather style={styles.actionItemIcon} name="camera" size={30} color={theme.colors.white}/>
                        <Text style={styles.actionItemText}>Doofilter</Text>
                        <Text style={styles.actionItemText}>Photo</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItemContainer}>
                    <LinearGradient colors={['#2179ae', '#004e72']} style={styles.actionItem}>
                        <Feather style={styles.actionItemIcon} name="video" size={30} color={theme.colors.white}/>
                        <Text style={styles.actionItemText}>Doofilter</Text>
                        <Text style={styles.actionItemText}>Vidéo</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>Follow us</Text>
            <View style={styles.content}>
                {
                    socialMedia.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} style={styles.grid} onPress={ ()=>{ Linking.openURL(item.link)}}>
                                <View style={styles.gridItem}>
                                    <Text style={styles.gridText}><SocialMediaIcon social={item.icon} /></Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    );
}


function SocialMediaIcon(props) {
    let social = props.social;
    if (social === 'facebookIcon') {
        return (<FontAwesome5 brand name={'facebook-square'} size={LOGO_SIZE} color={theme.colors.white}/>);
    } else if (social === 'tiktokIcon') {
        return (<FontAwesome5 brand name={'tiktok'} size={LOGO_SIZE} color={theme.colors.white}/>);
    } else if (social === 'instagramIcon') {
        return (<FontAwesome5 brand name={'instagram'} size={LOGO_SIZE} color={theme.colors.white}/>);
    } else if (social === 'youtubeIcon') {
        return (<FontAwesome5 brand name={'youtube'} size={LOGO_SIZE} color={theme.colors.white}/>);
    } else {
        return '';
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 14,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
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
    content: {
        width: '100%',
        overflow: 'hidden',
        flexDirection: 'row'
    },
    title: {
        width: '100%',
        marginTop: 8,
        marginBottom: 10,
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.white
    },
    actionContent: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 26,
    },
    actionItemContainer: {
        width: '48%',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: theme.colors.lightgray,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    actionItem: {
        width: '100%',
        height: 160,
        padding: 14,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: theme.colors.lightgray,
    },
    actionItemIcon: {
        marginBottom: 8,
        color: theme.colors.white
    },
    actionItemText: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.white
    },
    list: {
        height: IMAGE_SIZE,
        width: IMAGE_SIZE,
        borderRadius: BORDER_RADIUS,
        padding: GRID_PADDING,
        backgroundColor: theme.colors.lightgray
    },
    grid: {
        height: IMAGE_SIZE,
        width: IMAGE_SIZE,
        borderRadius: BORDER_RADIUS,
        padding: GRID_PADDING,
        maxWidth: 78,
        maxHeight: 78
    },
    gridItem: {
        height: '100%',
        width: '100%',
        borderRadius: BORDER_RADIUS,
        borderWidth: 3,
        borderColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.black60
    },
    gridText: {
        color: theme.colors.primary
    },
});
