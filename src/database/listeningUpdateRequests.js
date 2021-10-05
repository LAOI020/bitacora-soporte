
import { actionUpdateRequests } from '../actions/appActions';
import firebase from '../database/config';


let unsubscribe;

export const listeningUpdateRequest = () => {
    return (dispatch, getState) => {

        const {userInfo} = getState().appReducer;

        try {

            if(
                userInfo?.section === 'SISTEMAS' || 
                userInfo?.section === 'FINANZAS'
            ){
                unsubscribe = firebase.firestore()
                    .collection('App-bitacora-soporte')
                    .doc('reports')
                    .collection('allReports')
                    .orderBy('dateMilliseconds', 'desc')
                    .onSnapshot((snapshot) => {
                        
                        let requests = [];
                        console.log('cambio firestore');
                        
                        snapshot.docs.forEach((doc) => {
                            requests.push(doc.data());
                        });
        
                        dispatch(actionUpdateRequests(requests));
                    });
        
            } else if(userInfo){

                unsubscribe = firebase.firestore()
                    .collection('App-bitacora-soporte')
                    .doc('reports')
                    .collection('allReports')
                    .where('bussinesName', '==', userInfo.section)
                    .orderBy('dateMilliseconds', 'desc')
                    .onSnapshot((snapshot) => {
                        
                        let requests = [];
                        console.log('cambio firestore');
                        
                        snapshot.docs.forEach((doc) => {
                            requests.push(doc.data());
                        });
        
                        dispatch(actionUpdateRequests(requests));
                    });
            }
            
        } catch (err) {
            console.log(err);
        }
       
    }
};


export const unsubscriteFirebase = () => {
    unsubscribe();
};