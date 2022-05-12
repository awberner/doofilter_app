export const ADD_CURRENT_USER = "addCurrentUser";
export const REMOVE_CURRENT_USER = "removeCurrentUser";
export const GET_CURRENT_USER = "getCurrentUser";

export function addCurrentUser(data) {
    return {
        type: ADD_CURRENT_USER,
        data: {
            uid: data.uid,
            token: data.token,
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            gender: data.gender,
            avatar: data.avatar,
            coverA: data.cover,
            coverB1: data.coverB1,
            coverB2: data.coverB2,
        }};
}

export function removeCurrentUser() {
    return { type: this.REMOVE_CURRENT_USER }
}

export function getCurrentUser() {
    return { type: this.GET_CURRENT_USER }
}
