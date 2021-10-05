import { types } from "../types";

export const addRequestCompleted = () => {
    return (dispatch, getState) => {

        const {allRequests, selectedRequestFolio} 
            = getState().appReducer;

        const findRequest = allRequests.find(
            request => request.folio === selectedRequestFolio
        );

        dispatch({
            type: types.addRequestCompleted,
            payload: findRequest
        });

        dispatch({
            type: types.selectRequest,
            payload: null
        });
    }
}