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
                coverA: action.data.coverA,
                coverB1: action.data.coverB1,
                coverB2: action.data.coverB2,
            };
        case actions.REMOVE_CURRENT_USER:
            return [];
        case actions.GET_CURRENT_USER:
            return state;
        default:
            return state;
    }
}


