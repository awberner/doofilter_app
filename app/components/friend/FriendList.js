import {FlatList, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {theme} from "../../core/theme";
import Empty from "./Empty";
import {ActivityIndicator} from "react-native-paper";
import Friend from "./Friend";
import {getFriends} from "../../services/Members";
import {useTranslation} from "react-i18next";
const { width } = Dimensions.get("window");


export default function FriendList() {

    const { t } = useTranslation();
    const [friends, setFriends] = useState([]);
    const [caseList, setCaseList] = useState('friendList');
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20);
    const [isBusy, setIsBusy] = useState(false);
    const [isBusyRefresh, setIsBusyRefresh] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        offset === 0 ? setFriends([]) : false;
        getFriends(offset, limit, caseList).then((loadedFriends) => {
            setFriends([...friends, ...loadedFriends.posts]);
            if(loadedFriends.posts.length > 0) {
                setIsBusyRefresh(false);
                setIsBusy(false);
            } else {
                setHasMore(false);
            }
        });
    }, [offset]);


    const refresh = () => {
        if(!isBusyRefresh) {
            setOffset(0);
        }
    };

    const changeList = async (list) => {
        if(list !== caseList) {
            setFriends([]);
            setIsBusyRefresh(true);
            setIsBusy(true);
            setCaseList(list);
            setOffset(0);
        }
    };


    return (
        <>
            <View>
                <ScrollView style={styles.menu} horizontal={true}>
                    <TouchableOpacity
                        onPress={() => changeList('friendList')}
                        style={[styles.menuItem, caseList === 'friendList' ? styles.menuItemActive : false]} >
                        <Text style={styles.menuText}>{t("FRIENDS")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => changeList('pendingList')}
                        style={[styles.menuItem, caseList === 'pendingList' ? styles.menuItemActive : false]}>
                        <Text style={styles.menuText}>{t("REQUESTS")}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <View style={styles.content}>
                <FlatList
                    style={styles.list}
                    data={friends}
                    refreshing={isBusyRefresh}
                    onRefresh={refresh}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={() => { !isBusy ? setOffset(offset + limit) : false}}
                    ListEmptyComponent={() => <Empty />}
                    ListFooterComponent={() => {
                        return isBusy && hasMore ?
                            <ActivityIndicator
                                size={"small"}
                                animating={true} color={theme.colors.white}
                                style={styles.activityIndicator}
                            /> : null;
                    }}
                    renderItem={({ item }) => {
                        return <Friend friend={item} case={caseList}/>;
                    }}
                />
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    menu: {
        width: width,
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: theme.colors.white,
        borderBottomWidth: 1,
        borderColor: theme.colors.gray
    },
    menuItem: {
        width: (width / 2),
        backgroundColor: theme.colors.white,
        alignItems: "center",
        paddingVertical: 15,
        fontSize: 14,
        fontWeight: "600",
        fontFamily: "Poppins_600SemiBold",
        borderBottomWidth: 4,
        borderColor: theme.colors.white,
    },
    menuText: {
        backgroundColor: theme.colors.white,
        textAlign: "center",
        fontSize: 14,
        fontWeight: "600",
        fontFamily: "Poppins_600SemiBold",
    },
    menuItemActive: {
        borderColor: theme.colors.primaryHover
    },
    friendList: {
        width: width,
        flexDirection: "column",
        justifyContent: "flex-start",
        marginVertical: 6,
    },
    list: {
        backgroundColor: theme.colors.white,
        flex: 1,
    },
    content: {
        flex: 1,
    },
    activityIndicator: {
        alignSelf: "center",
        paddingVertical: 50
    },
});

