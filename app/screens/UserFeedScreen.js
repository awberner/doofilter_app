import React, {useEffect, useState} from "react";
import BackgroundBlurred from "../components/backgrounds/BackgroundBlurred";
import AppBarFeed from "../components/appBars/AppBarFeed";
import TabBar from "../components/tabBar/TabBar";
import {Dimensions, FlatList, StyleSheet, View} from "react-native";
import Post from "../components/feed/Post";
import {ActivityIndicator} from "react-native-paper";
import {theme} from "../core/theme";

const ITEM_HEIGHT = Dimensions.get('window').height - 89;

export default function UserFeedScreen ({route, navigation}) {


    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(5);
    const [isBusy, setIsBusy] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isBusyRefresh, setIsBusyRefresh] = useState(false);

    const [index , setIndex] = useState(route.params.currentItemView);
    const [posts , setPosts] = useState(route.params.posts);
    const [user , setUser] = useState(route.params.user);


    return (
        <BackgroundBlurred>

            <AppBarFeed goBack/>

            <View style={styles.container}>
                <FlatList
                    data={posts}
                    initialScrollIndex={index}
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={isBusyRefresh}
                    onRefresh={() => {
                        if(!isBusyRefresh) {
                            setOffset(0);
                        }
                    }}
                    renderItem={({item, index}) => {
                        return <Post
                            navigation={navigation}
                            post={item} />;
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
                    showsVerticalScrollIndicator={false}
                    snapToInterval={Dimensions.get('window').height - 89}
                    snapToAlignment={'start'}
                    decelerationRate={'fast'}
                    getItemLayout={(data, index) => (
                        {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
                    )}
                />
            </View>

            <TabBar />

        </BackgroundBlurred>
    );

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

