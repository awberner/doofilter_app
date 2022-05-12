import * as React from 'react';
import {theme} from "../../core/theme";
import {StyleSheet, View, Image, Text} from "react-native";
import {useFonts, Poppins_500Medium, Poppins_700Bold} from '@expo-google-fonts/poppins'
import {useEffect, useState} from "react";
import AppLoading from "expo-app-loading";
import AnimatedSplash from "react-native-animated-splash-screen";


const Cover = ({user}) => {

    const [avatar, setAvatar] = useState("https://media.doodive.com/default/doodive/default-avatar.png");
    const [coverA, setCoverA] = useState("https://media.doodive.com/default/doodive/default-background.png");
    const [coverB1, setCoverB1] = useState("https://media.doodive.com/default/doodive/default-background.png");
    const [coverB2, setCoverB2] = useState("https://media.doodive.com/default/doodive/default-background.png");
    const [firstname, setFirstname] = useState(false);
    const [lastname, setLastname] = useState(false);
    const [certification, setCertification] = useState(false);

    let { posts_count, followers_count, following_count } = user;

    useEffect(async () => {
        user.av ? setAvatar("https://media.doodive.com/media/"+user.av) : false;
        user.covA ? setCoverA("https://media.doodive.com/media/"+user.covA) : false;
        user.covB1 ? setCoverB1("https://media.doodive.com/media/"+user.covB1) : false;
        user.covB2 ? setCoverB2("https://media.doodive.com/media/"+user.covB2) : false;
        user.fst ? setFirstname(user.fst) : false;
        user.lst ? setLastname(user.lst) : false;
        user.cert ? setCertification(user.cert) : false;
    }, [user]);


    let [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_700Bold,
    });

    if (!fontsLoaded) {
        return <AnimatedSplash
            translucent={true}
            isLoaded={true}
            logoImage={require("../../assets/images/logo.png")}
            backgroundColor={"#262626"}
            logoHeight={500}
            logoWidth={300}
        />;
    } else {
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.avatarContainer}>
                        <Image source={{uri: avatar}}
                               resizeMode={"cover"}
                               style={styles.avatar} />
                    </View>
                    <View style={styles.row}>
                        <Image source={{uri: coverA}}
                               resizeMode={"cover"}
                               style={[styles.covers, styles.coverA]} />
                    </View>

                    <View style={styles.row}>
                        <Image source={{uri: coverB1}}
                               resizeMode={"cover"}
                               style={[styles.covers, styles.coverB1]} />
                        <Image source={{uri: coverB2}}
                               resizeMode={"cover"}
                               style={[styles.covers, styles.coverB2]} />
                    </View>
                </View>

                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{firstname} {lastname}</Text>
                    {
                        certification ?
                            <Text style={styles.certification}>{certification}</Text> :
                            false
                    }
                </View>

                <View style={styles.userStatsContainer}>
                    <View style={styles.userStat}>
                        <Text style={styles.statNumber}>{posts_count}</Text>
                        <Text style={styles.statLabel}>Posts</Text>
                    </View>
                    <View style={styles.userStat}>
                        <Text style={styles.statNumber}>{followers_count}</Text>
                        <Text style={styles.statLabel}>Followers</Text>
                    </View>
                    <View style={styles.userStat}>
                        <Text style={styles.statNumber}>{following_count}</Text>
                        <Text style={styles.statLabel}>Following</Text>
                    </View>
                </View>
            </View>
        );
    }
};

export default Cover;


const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        flexWrap: 'wrap',
        backgroundColor: theme.colors.white,
    },
    row : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    avatarContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.white,
        borderWidth: 3,
        position: "absolute"
    },
    covers: {
        borderRadius: 0,
    },
    coverA: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        height: 156,
        marginBottom: 4,
    },
    coverB1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        height: 154,
        marginRight: 2,
    },
    coverB2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        height: 154,
        marginLeft: 2,
    },
    nameContainer: {
        paddingTop: 12,
        paddingHorizontal: 14,
        textAlign: "center",
        backgroundColor: theme.colors.white,
    },
    name: {
        fontSize: 24,
        letterSpacing: 0.2,
        fontWeight: '600',
        fontFamily: 'Poppins_600SemiBold',
        color: theme.colors.black,
        textAlign: "center"
    },
    certification: {
        fontSize: 14,
        fontWeight: "500",
        fontFamily: 'Poppins_600SemiBold',
        color: theme.colors.black,
        textAlign: "center"
    },
    appbar: {
        backgroundColor: theme.colors.primary,
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
    },
    userStatsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 14,
        paddingBottom: 20,
        backgroundColor: theme.colors.white,
    },
    userStat: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    statNumber: {
        fontSize: 18,
        fontWeight: "bold",
    },
    statLabel: {
        fontWeight: "bold",
        paddingTop: 2,
        color: "#888",
    },
});
