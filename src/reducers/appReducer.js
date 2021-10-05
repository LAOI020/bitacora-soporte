import { types } from "../types";


const initialState = {
    widthScreen: 0,
    userInfo: null,
    allRequests: [],
    requestsCompleted: [],
    selectedRequestFolio: null,
    makeNewRequest: false
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.widthScreen:
            return {
                ...state,
                widthScreen: action.payload
            }

        case types.getUserInfo:
            return {
                ...state,
                userInfo: action.payload
            }

        case types.getRequestsCompleted:
            return {
                ...state,
                requestsCompleted: action.payload
            }
        
        case types.updateRequests:
            return {
                ...state,
                allRequests: action.payload
            }
    
        case types.selectRequest:
            return {
                ...state,
                selectedRequestFolio: action.payload
            }

        case types.makeNewRequest:
            return {
                ...state,
                makeNewRequest: action.payload
            }

        case types.addRequestCompleted:
            return {
                ...state,
                requestsCompleted: [action.payload, ...state.requestsCompleted]
            }

        default:
            return state;
    }
}