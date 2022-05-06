import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Cover from "../cover/Cover";
import {ActivityIndicator} from "react-native-paper";
import {theme} from "../../core/theme";
import {getUser} from "../../services/Members";
import {getPostsByUserId} from "../../services/Posts";
import ProfileGridPost from "./Post";

const ProfileGrid = ({uid}) => {

    const [member, setMember] = useState(false);
    const [posts, setPosts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(9);
    const [isBusy, setIsBusy] = useState(false);
    const [hasMore, setHasMore] = useState(true);


    useEffect(async () => {
        setIsBusy(true);
        getUser(uid).then((member) => {
            setMember(member);
        });
        getPostsByUserId(uid, offset, limit).then((loadedPosts) => {
            setPosts([...posts, ...loadedPosts.posts]);
            loadedPosts.posts.length > 0 ? setIsBusy(false) : setHasMore(false);
        });
    }, [offset]);


    return (
        <View style={styles.content}>

            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                horizontal={false}
                renderItem={({item, index}) => {
                    return <ProfileGridPost data={posts} index={index} post={item}/>;
                }}
                ListHeaderComponent={<Cover user={member} />}
                ListFooterComponent={() => {
                    return isBusy && hasMore ?
                        <ActivityIndicator
                            size={"small"}
                            animating={true} color={theme.colors.white}
                            style={{ alignSelf: "center", paddingVertical: 50 }}
                        /> : null
                }}
                onEndReached={() => {
                    if (!isBusy) {
                        setOffset(offset + limit);
                    }
                }}
                onEndReachedThreshold={0.5}
                maxToRenderPerBatch={4}
                removeClippedSubviews
                showsVerticalScrollIndicator={false}
            />

        </View>
    )
}

export default ProfileGrid;


const styles = StyleSheet.create({
    content: {
        flex: 1,
    }
});
