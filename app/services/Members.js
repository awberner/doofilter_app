import * as SecureStore from "expo-secure-store";
import {API_URL, API_TOKEN} from '@env';
import axios from "axios";



/* ================================================================== */
/* LOGIN                                                              */
/* ================================================================== */

export const signIn = (email, password) => new Promise(async (resolve) => {
    const req = {
        email: email,
        pwd: password,
        action : 'signin',
        token : API_TOKEN
    };

    axios.post(API_URL + 'doofilter_app', req)
        .then( async res => {
            if(res && res.data && res.data.response) {
                let data = res.data.response;
                await SecureStore.setItemAsync('user', data.uid);
                await SecureStore.setItemAsync('userToken', data.token);
                await SecureStore.setItemAsync('userInfo', JSON.stringify(data));
                resolve(res.data.response);
            } else {
                resolve({'error': true})
            }
        })
        .catch(function (error) {
            resolve({'error': true})
        });
});



/* ================================================================== */
/* REFRESH USER INFO                                                  */
/* ================================================================== */

export const refreshCurrentUser = (uid, token) => new Promise(async (resolve) => {
    const req = {
        uid: uid,
        userToken: token,
        action : 'refreshUser',
        token : API_TOKEN
    };

    axios.post(API_URL + 'doofilter_app', req)
        .then( async res => {
            if(res && res.data && res.data.response) {
                let data = res.data.response;
                await SecureStore.setItemAsync('user', data.uid);
                await SecureStore.setItemAsync('userToken', data.token);
                await SecureStore.setItemAsync('userInfo', JSON.stringify(data));
                resolve(res.data.response);
            } else {
                resolve({'error': true})
            }
        })
        .catch(function (error) {
            resolve({'error': true})
        });
});



/* ================================================================== */
/* GET CURRENT USER                                                   */
/* ================================================================== */

export const getUser = (user) => new Promise(async (resolve) => {
    const data = {
        'av': '67227389439586200dc50d4bcf',
        'covA': '123461af5c6b2b5cc',
        'covB1': '672273894395861b0781b54fa3',
        'covB2': '672273894395861b0783d9ac93',
        'em': 'test@email.com',
        'fst': 'John',
        'lst': 'Doo',
        'gen': 'male',
        'id': '123',
        'purl': 'john.doo',
        'cert': '',
        'posts_count': 128,
        'followers_count': 230,
        'following_count': 201,
        'us': true,
        'error': false,
    }
    resolve(data);
});


export const getFriends = (offset, limit, caseList) => new Promise(async (resolve) => {
    const friends = {
        posts: [
            {
                "avatar": "486325679423861b1b9aa2d10b",
                "certification": "DIVEMASTER",
                "commun": 3,
                "firstname": "Philippe",
                "id": "4863256794238",
                "lastname": "Ocean",
                "purl": "philippe.jarlet",
                "relation": 1,
            },
            {
                "avatar": "167968738532461af149af2a2d",
                "certification": "RCC MKVI / Se7en",
                "commun": 3,
                "firstname": "Plongeur",
                "id": "1679687385324",
                "lastname": "X",
                "purl": "plongeur.x",
                "relation": 2,
            },
            {
                "avatar": "253419618779561af144930b8a",
                "certification": "ADVANCED OPEN WATER DIVER",
                "commun": 3,
                "firstname": "Boubacar",
                "id": "2534196187795",
                "lastname": "Kipre",
                "purl": "3516845299612",
                "relation": 3,
            },
            {
                "avatar": "191652625388761af149b71fef",
                "certification": "OPEN WATER INSTRUCTOR",
                "commun": 3,
                "firstname": "Margaux",
                "id": "1916526253887",
                "lastname": "Le Brun",
                "purl": "9864531425386",
                "relation": 20,
            },
        ],
        offset: 20
    }
    resolve(friends);
});
