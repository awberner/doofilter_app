import * as SecureStore from "expo-secure-store";
import axios from "axios";
import {API_TOKEN} from '@env';


export const signIn = (email, password) => new Promise(async (resolve) => {
    const member = {
        avatar: 'https://media.doodive.com/media/67227389439586200dc50d4bcf',
        user: '61b1b12178cfb',
        userToken: '61b1b12178cfb',
        token: '61b1b12178cfb'
    }
    resolve(member);
});

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
