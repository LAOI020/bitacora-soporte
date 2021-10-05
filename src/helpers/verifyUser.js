
import Swal from 'sweetalert2';
import { actionUserInfo } from '../actions/appActions';
import firebase from '../database/config';


export const verifyUser = async (history, dispatch) => {

    const infoLocalStorage = localStorage.getItem('rlwertk');

    const userDatabase = await firebase.firestore()
        .collection('App-bitacora-soporte')
        .doc('users')
        .collection('allUsers')
        .where('uuid', '==', infoLocalStorage)
        .limit(1)
        .get();

    if(userDatabase.docs[0].exists){
        await dispatch(actionUserInfo({
            name: userDatabase.docs[0].id,
            section: userDatabase.docs[0].data().section
        }));

    } else {
        localStorage.clear();

        history.replace("/login")
    }
}


export const checkLoginUser = async (history, dispatch) => {
    
    const infoLocalStorage = localStorage.getItem('rlwertk');

    const userDatabase = await firebase.firestore()
        .collection('App-bitacora-soporte')
        .doc('users')
        .collection('allUsers')
        .where('uuid', '==', infoLocalStorage)
        .limit(1)
        .get();

    if(userDatabase.docs[0].exists){
        dispatch(actionUserInfo({
            name: userDatabase.docs[0].id,
            section: userDatabase.docs[0].data().section
        }));

        history.replace('/');

    } else {
        localStorage.clear();
    }
}


export const loginUser = async (code, history, dispatch) => {

    if(code.trim().length === 0){
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Contraseña incorrecta'
        });
    }

    const userDatabase = await firebase.firestore()
        .collection('App-bitacora-soporte')
        .doc('users')
        .collection('allUsers')
        .where('code', '==', code)
        .limit(1)
        .get();
    
    if(userDatabase.docs.length === 1){
        localStorage.setItem(
            'rlwertk', userDatabase.docs[0].data().uuid
        );

        dispatch(actionUserInfo({
            name: userDatabase.docs[0].id,
            section: userDatabase.docs[0].data().section
        }));

        history.replace('/');

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Contraseña incorrecta'
        });
    }
}