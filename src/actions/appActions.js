import { types } from "../types";


export const actionUserInfo = (userInfo) => ({
    type: types.getUserInfo,
    payload: userInfo
});


export const actionUpdateRequests = (requests) => ({
    type: types.updateRequests,
    payload: requests
});


export const actionSelectRequest = (folio) => ({
    type: types.selectRequest,
    payload: folio
});


export const actionMakeNewRequest = (value) => ({
    type: types.makeNewRequest,
    payload: value
});