export const ADD_CURRENT_USER = "addCurrentUser";
export const REMOVE_CURRENT_USER = "removeCurrentUser";


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
            cover: data.cover,
        }};
}

export function removeCurrentUser(data) {
    return { type: this.REMOVE_CURRENT_USER }
}
