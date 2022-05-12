import React, {useEffect, useRef, useState} from "react";
import AppLoading from "expo-app-loading";
import {
    StyleSheet,
    Dimensions,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
    Text,
    TextInput,
    View,
    Image,
} from "react-native";
import {
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold, Poppins_700Bold,
    useFonts
} from "@expo-google-fonts/poppins";
const { width, height } = Dimensions.get("window");
import {useTranslation, Trans} from "react-i18next";
import {MEDIA_SERVER_MEDIA, API_TOKEN} from '@env';
import {theme} from "../../core/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modalbox";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { ActivityIndicator } from 'react-native-paper';
import AnimatedSplash from "react-native-animated-splash-screen";


const PostsCommentModal = ({reference, open, isOpenModal, setModalVisible, post}) => {

    const { t } = useTranslation();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [loading, setIsLoading] = useState(true);

    let [fontsLoaded] = useFonts({
        Poppins_300Light,
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });


    useEffect(() => {
        fetchComments();
    }, [post]);


    // FETCH POSTS
    const fetchComments = async () => {
        setIsLoading(true);

        const member = await SecureStore.getItemAsync('user');

        const req = {
            'token': API_TOKEN,
            'post': post,
            'member': member
        }
        axios.post(`https://www.doodive.com/doofilter_app/postComments`, req, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(function async(res) {
            setComments([...res.data.comments]);
            setIsLoading(false);
        }).catch(function (error) {
            alert(JSON.stringify(error.message));
        });
    };

    const handleClose = () => {
        setModalVisible(false);
    };

    const handleComment = () => {
        alert('saving comment');
    }

    const renderItem = ( comment, index ) => {
        if(comment) {
            return (
                <View key={index} style={styles.commentContainer}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{uri: MEDIA_SERVER_MEDIA + comment.avatar + '/420x'}}
                            resizeMode={'cover'}
                            style={styles.avatar}
                        />
                    </View>
                    <View style={styles.memberContainer}>
                        <Text style={styles.name}>{comment.firstname} {comment.lastname}</Text>
                        <Text style={styles.comment}>{comment.comment}</Text>
                        <Text style={styles.date}>{comment.date}</Text>
                    </View>
                    <View style={styles.dots}>
                        <Entypo name="dots-three-horizontal" size={20} color={theme.colors.primary}/>
                    </View>
                </View>
            );
        }
    }


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

            <Modal
                entry={"bottom"}
                isOpen={isOpenModal}
                style={styles.modalBox}
                swipeArea={height * 0.15 + 47}
                onClosed={() => {
                    setModalVisible(false);
                    setComment('');
                }}>


                <View style={styles.modalContent}>
                    <View style={styles.scrollBar} />
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderText}>{t("COMMENTS_COUNT", {count: comments.length > 0 ? comments.length : ''})}</Text>
                        <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
                            <AntDesign name="close" size={22} color={theme.colors.primary}  />
                        </TouchableOpacity>
                    </View>
                    <ScrollView >
                        {
                            !loading && comments ?
                                comments.length > 0 ?
                                    comments.map((comment, index) => {
                                        return renderItem(comment, index);
                                    }) : <Text style={styles.empty}>{t("NO_COMMENT_BE_FIRST")}</Text> :
                                <ActivityIndicator
                                    size={30}
                                    animating={true} color={theme.colors.lightgray}
                                    style={{alignSelf: "center", paddingVertical: 50}}
                                />
                        }
                    </ScrollView>
                </View>

                <KeyboardAvoidingView behavior={"position"} style={styles.modalComment}>
                    <View style={styles.modalCommentContainer}>
                        <Image
                            source={{uri: MEDIA_SERVER_MEDIA + '123461af5c4f2ed97/420x'}}
                            resizeMode={'cover'}
                            style={styles.avatarComment}
                        />
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={comment}
                                onChangeText={setComment}
                                onSubmitEditing={() => alert(comment)}
                                placeholder={t("ADD_COMMENT")}
                                style={styles.input}
                                multiline={true}
                                numberOfLines={5}
                                maxHeight={120}
                                maxLength = {250}
                            />
                        </View>
                        <TouchableOpacity style={styles.sendBtn} onPress={handleComment}>
                            <FontAwesome name="send-o" size={26} color={theme.colors.primary} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

            </Modal>
        )
    }
}

export default PostsCommentModal;


const styles = StyleSheet.create({
    modalBox: {
        backgroundColor: "transparent",
        alignItems: "center",
        position: "relative"
    },
    scrollBar : {
        width: 85,
        height: 6,
        position: "absolute",
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 10,
        zIndex: 1000,
        top: -10
    },
    modalContent: {
        position: "absolute",
        bottom: 0,
        width: width,
        height: height * 0.8,
        alignItems: "center",
        paddingBottom: 40,
        borderRadius: 20,
        paddingHorizontal: 0,
        backgroundColor: theme.colors.white,
    },
    modalHeader: {
        width: width,
        height: 47,
        marginHorizontal: 0,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        position: "relative",
    },
    closeBtn: {
        position: "absolute",
        top: 8,
        right: 10,
        height: 30,
        width: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    modalHeaderText: {
        fontSize: 13,
        paddingVertical: 14,
        fontFamily: 'Poppins_500Medium',
        textAlign: "center",
    },
    commentContainer: {
        width: width,
        paddingTop: 12,
        paddingHorizontal: 12,
        flexDirection: "row",
    },
    avatarContainer: {
        width: 32,
        height: 32,
        borderRadius: 32 / 2,
        marginRight: 14,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 36 / 2,
    },
    memberContainer: {
        flex: 1,
        alignItems: "flex-start",
        top: -2,
    },
    name: {
        fontSize: 13,
        letterSpacing: 0.2,
        fontFamily: 'Poppins_600SemiBold',
    },
    comment: {
        fontSize: 13,
        fontFamily: 'Poppins_400Regular',
    },
    date: {
        marginTop: 4,
        fontSize: 11,
        fontFamily: 'Poppins_500Medium',
        color: theme.colors.mediumgray
    },
    dots: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.lightgray0
    },
    modalComment: {
        position: 'absolute',
        bottom: 0
    },
    modalCommentContainer: {
        width: width,
        alignItems: 'flex-start',
        backgroundColor: theme.colors.lightgray0,
        paddingVertical: 12,
        paddingHorizontal: 22,
        alignSelf: 'flex-start',
        justifyContent: "flex-start",
        flexDirection: "row"
    },
    empty: {
        width: width,
        height: 200,
        paddingVertical: 20,
        paddingHorizontal: 20,
        color: theme.colors.mediumgray,
        fontSize: 13,
        letterSpacing: 0.1,
        fontFamily: 'Poppins_600SemiBold',
        textAlign: "center"
    },
    inputContainer: {
        flex: 1,
        minHeight: 38,
        borderRadius: 8,
        backgroundColor: theme.colors.white,
        paddingHorizontal: 10,
        paddingTop: 8,
        paddingBottom: 10,
        justifyContent: "center",
        marginBottom: 20,
    },
    input: {
        backgroundColor: theme.colors.white,
        fontSize: 14,
        lineHeight: 20,
        paddingTop: 0,
        paddingBottom: 0,
        alignItems: "center",
        top: -1
    },
    avatarComment : {
        width: 36,
        height: 36,
        borderRadius: 36 / 2,
        marginRight: 10,
    },
    sendBtn : {
        width: 36,
        height: 36,
        borderRadius: 36 / 2,
        marginLeft: 10,
        alignItems: "center",
        justifyContent: "center",
    }
});
