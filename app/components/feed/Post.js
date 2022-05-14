import React, {useState, useEffect, useRef, forwardRef} from "react";
import {View, Text, Dimensions, Animated, Image, TouchableOpacity, StyleSheet} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { DoubleTap } from "./DoubleTap";
import { ProgressiveImage } from "./ProgressiveImage";
import {theme} from "../../core/theme";
const { width, height } = Dimensions.get("window");
import {MEDIA_SERVER_MEDIA, MEDIA_SERVER_DOODIVE_DEFAULT} from '@env';
import {Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, useFonts} from "@expo-google-fonts/poppins";
import {useNavigation} from "@react-navigation/native";
import {SharedElement} from "react-navigation-shared-element";
import AnimatedSplash from "react-native-animated-splash-screen";

const POST_ACTION_ICONS_SIZE = 28;
const LIKE_ANIMATION_ICON_SIZE = width / 4;


export const Post = forwardRef((props, parentRef ) => {

    let { post, owner_uid, purl, avatar, firstname, lastname, certification, imgURL, confirmed, comments, likes, hasLiked, userSelf} = props.post;

    const ref = useRef(null);
    const navigation = useNavigation();
    const likeAnim = useRef(new Animated.Value(0)).current;
    const [likesList, setLikesList] = useState(likes);
    const [liked, setLiked] = useState(hasLiked);

    avatar = (avatar) ?
        { uri: MEDIA_SERVER_MEDIA + avatar + "/420x" } :
        { uri: MEDIA_SERVER_DOODIVE_DEFAULT + 'default-avatar.png' };

    let image = (imgURL) ?
        { uri: MEDIA_SERVER_MEDIA + imgURL+ "/960x" } :
        { uri: MEDIA_SERVER_DOODIVE_DEFAULT + 'default-avatar.png' };

    let [fontsLoaded] = useFonts({
        Poppins_300Light,
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    useEffect(async () => {
        if (ref.current == null) { return }
        try {
            await ref.current.unloadAsync();
        } catch (e) {
            console.log(e);
        }
    }, [])

    useEffect(() => {
        likeAnim.setValue(0);
        Animated.timing(likeAnim, {
            duration: 0,
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }, [liked]);
    const likePost = () => {
        setLiked(l => !l);
        setLikesList(l => (liked ? l - 1 : l + 1));
    };
    const scale = likeAnim.interpolate({
        inputRange: [0, 0.3, 0.7, 0.75, 1],
        outputRange: [0, 1, 0.8, 1, 0],
    });
    const opacity = likeAnim.interpolate({
        inputRange: [0, 0.6, 1],
        outputRange: [1, 1, 0],
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
            <View style={styles.container}>
                {/* CONTAINER */}
                <DoubleTap doubleTap={likePost}>
                    <View>

                        {/* IMAGE */}
                        <SharedElement id={`index_`+post}>
                            <ProgressiveImage
                                source={image}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </SharedElement>

                        {/* ROW USER */}
                        <View style={styles.rowUser}>
                            <View>
                                <TouchableOpacity onPress={() => {
                                    console.log('-------x');
                                    userSelf ?
                                        navigation.navigate('ProfileScreen') :
                                        navigation.navigate('UserProfileScreen', {uid: owner_uid});
                                }}>
                                    <View style={styles.avatarContainer}>
                                        <Image
                                            source={avatar}
                                            resizeMode={'cover'}
                                            style={styles.avatar}
                                        />
                                    </View>
                                    <Text style={styles.userName}>
                                        {firstname + ' ' + lastname + ' ' || "username"}
                                        {confirmed ?
                                            <Octicons name="verified" color={theme.colors.primary} size={15}/> : false}
                                    </Text>
                                </TouchableOpacity>
                                {certification ?
                                    <Text style={styles.userCertification}>
                                        {certification}
                                    </Text> : false
                                }
                            </View>
                        </View>

                        {/* COLUMN ACTION */}
                        <View
                            style={styles.actionColumn}>
                            {/*<View style={styles.topAction}>
                                <Entypo name="dots-three-vertical" color={theme.colors.white} size={POST_ACTION_ICONS_SIZE} />

                            </View>*/}
                            <View style={styles.bottomAction}>
                                <TouchableOpacity style={styles.iconContainer} onPress={likePost}>
                                    <AntDesign
                                        name={liked ? "heart" : "hearto"}
                                        color={liked ? "#ff0000" : theme.colors.white}
                                        size={POST_ACTION_ICONS_SIZE}
                                    />
                                    <Text style={styles.statsLabel}>{likes.length > 0 ? likes.length : '' }</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.iconContainer} onPress={() => props.onOpen(comments, post)}>
                                    <SimpleLineIcons
                                        name="bubble"
                                        style={{marginTop: 10}}
                                        color={theme.colors.white}
                                        size={POST_ACTION_ICONS_SIZE}
                                    />
                                    <Text style={styles.statsLabel}>{comments ? comments.length : '' }</Text>
                                </TouchableOpacity>

                                <FontAwesome5
                                    name="share"
                                    style={{marginTop: 8}}
                                    size={POST_ACTION_ICONS_SIZE}
                                    color={theme.colors.white}
                                />
                                <Text style={styles.statsLabel}></Text>
                            </View>

                        </View>
                    </View>
                </DoubleTap>

                {/* LIKED ANIMATION */}
                {liked && (
                    <Animated.View
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            justifyContent: "center",
                            alignItems: "center",
                            opacity,
                            transform: [{scale}],
                        }}>
                        <View
                            style={{
                                padding: 10,
                                borderRadius: 10,
                            }}>
                            <AntDesign
                                name="heart"
                                color={theme.colors.white}
                                size={LIKE_ANIMATION_ICON_SIZE}
                            />
                        </View>
                    </Animated.View>
                )}
            </View>
        );
    }
});

export default Post;

Post.sharedElements = (route) => {
    const {item} = route.params.data[route.params.currentItemView];

    return [
        {id: `index_`+item.post}
    ];
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height - 89,
    },
    rowUser: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 0,
        paddingHorizontal: 24,
        position: 'absolute',
        bottom: 25,
        width: width * 0.8,
        zIndex: 3
    },
    avatarContainer: {
        height: 52,
        width: 52,
        borderRadius: 52 / 2,
        borderWidth: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderColor: theme.colors.white,
        overflow: 'hidden',
        marginBottom: 4
    },
    avatar: {
        height: undefined,
        width: undefined,
        borderWidth: 3,
        borderRadius: 52 / 2,
        borderColor: theme.colors.black,
        flex: 1,
    },
    userName: {
        marginTop: 5,
        marginRight: 4,
        fontFamily: 'Poppins_600SemiBold',
        fontWeight: '700',
        letterSpacing: 0.2,
        color: theme.colors.white,
        fontSize: 16,
        marginBottom: 4
    },
    userCertification: {
        marginRight: 4,
        fontSize: 15,
        letterSpacing: 0.2,
        fontWeight: '300',
        fontFamily: 'Poppins_300Light',
        color: theme.colors.white
    },
    actionColumn: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
        marginHorizontal: 5,
        position: 'absolute',
        top: 0,
        right: 0,
        width: width * 0.15,
        height: '100%',
        zIndex: 3
    },
    topAction: {
        alignItems: "center",
    },
    bottomAction: {
        height: '100%',
        justifyContent: "flex-end",
        alignItems: "center",
    },
    iconContainer: {
        alignItems: "center"
    },
    statsLabel: {
        color: theme.colors.white,
        fontSize: 15,
        fontWeight: '600',
        fontFamily: 'Poppins_600SemiBold',
        marginTop: 3,
        marginBottom: 10,
        height: 20
    }
});
