
import { types } from '../types';
import firebase from './config';


export const getRequestsCompleted = () => {
    return async (dispatch, getState) => {
        
        const {userInfo} = getState().appReducer;

        let requests = [];

        if(
            userInfo?.section === 'SISTEMAS' || 
            userInfo?.section === 'FINANZAS'
        ){
            const requestsCompleted = 
                await firebase.firestore()
                    .collection('App-bitacora-soporte')
                    .doc('reports')
                    .collection('completed')
                    .orderBy('dateMilliseconds', 'desc')
                    .get();
            
            requestsCompleted.docs.forEach((request) => {
                requests.push(request.data());
            });
            
        } else {
            const requestsCompleted = 
                await firebase.firestore()
                    .collection('App-bitacora-soporte')
                    .doc('reports')
                    .collection('completed')
                    .where('bussinesName', '==', userInfo.section)
                    .orderBy('dateMilliseconds', 'desc')
                    .get();
            
            requestsCompleted.docs.forEach((request) => {
                requests.push(request.data());
            });
        }

        dispatch({
            type: types.getRequestsCompleted,
            payload: requests
        });
    }
}