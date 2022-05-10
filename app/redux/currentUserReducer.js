import * as actions from "./actions"

export default function currentUser( state = [], action ) {
    switch (action.type) {
        case actions.ADD_CURRENT_USER:
            return {
                uid: action.data.uid,
                token: action.data.token,
                email: action.data.email,
                firstname: action.data.firstname,
                lastname: action.data.lastname,
                gender: action.data.gender,
                avatar: action.data.avatar,
                cover: action.data.cover,
            };
        case actions.REMOVE_CURRENT_USER:
            return [];
        default:
            return state;
    }
}


