import React, { useState, useEffect, useRef } from "react";
import {View, FlatList, Dimensions, StyleSheet} from "react-native";
import Post from "./Post";
import {theme} from "../../core/theme";
const { width } = Dimensions.get("window");
import PostsCommentModal from "../modals/PostCommentModal";
import { ActivityIndicator } from 'react-native-paper';
import {getPosts} from "../../services/Posts";

const ITEM_HEIGHT = Dimensions.get('window').height - 89;


export default function FeedList ({navigation}) {

    const mediaRefs = useRef([]);
    const [openModalPostComment, setOpenModalPostComment] = useState(false);
    const [modalPostCommentsPost, setModalPostCommentsPost] = useState(false);
    const [modalPostCommentsCount, setModalPostCommentsCount] = useState(false);
    const [posts, setPosts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(5);
    const [isBusy, setIsBusy] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isBusyRefresh, setIsBusyRefresh] = useState(false);


    useEffect(async () => {
        setIsBusy(true);
        offset === 0 ? setPosts([]) : false;
        getPosts(offset, limit).then((loadedPosts) => {
            setPosts([...posts, ...loadedPosts.posts]);
            loadedPosts.posts.length > 0 ? setIsBusy(false) : setHasMore(false);
        });
    }, [offset]);


    // POST COMMENT MODAL
    const modalPostComentRef = useRef(null);
    const onOpen = (comments, post) => {
        setModalPostCommentsPost(post);
        setModalPostCommentsCount(comments);
        setOpenModalPostComment(true);
    };

    // VIEWABLE CHANGE
    const onViewableItemsChanged = (({changed}) => {
        changed.forEach(element => {
            //console.log('onViewableItemsChanged', element, element.isVisible);
        });
    });
    const viewabilityConfigCallbackPairs = useRef([{
        viewabilityConfig: {itemVisiblePercentThreshold: 100},
        onViewableItemsChanged: onViewableItemsChanged
    }]);


    return (
        <>

            <View style={styles.container}>
                <FlatList
                    data={posts}
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={isBusyRefresh}
                    onRefresh={() => {
                        if(!isBusyRefresh) {
                            setOffset(0);
                        }
                    }}
                    renderItem={({item, index}) => {
                        return <Post
                            ref={PostSingleRef => (mediaRefs.current[item] = PostSingleRef)}
                            navigation={navigation}
                            post={item} onOpen={onOpen}/>;
                    }}
                    onEndReached={() => { !isBusy ? setOffset(offset + limit) : false}}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={() => {
                        return isBusy && hasMore ?
                            <View style={{flex: 1, width: width, height: ITEM_HEIGHT}}>
                                <ActivityIndicator
                                    size={"large"}
                                    animating={true} color={theme.colors.white}
                                    style={{flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 50}}
                                />
                            </View> : null;
                    }}
                    windowSize={4}
                    maxToRenderPerBatch={4}
                    initialNumToRender={0}
                    removeClippedSubviews
                    viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
                    viewabilityConfigCallbackPairs={ viewabilityConfigCallbackPairs.current}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={Dimensions.get('window').height - 89}
                    snapToAlignment={'start'}
                    decelerationRate={'fast'}
                    getItemLayout={(data, index) => (
                        {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
                    )}
                />
            </View>

            <PostsCommentModal  reference={modalPostComentRef} isOpenModal={openModalPostComment} setModalVisible={setOpenModalPostComment} post={modalPostCommentsPost} comments={modalPostCommentsCount} />

        </>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

