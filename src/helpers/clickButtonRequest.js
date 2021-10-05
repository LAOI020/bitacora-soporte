
import Swal from 'sweetalert2';
import firebase from '../database/config';
import moment from 'moment';
import 'moment/locale/es-mx';
import { addRequestCompleted } from './addRequestCompleted';
import { sendNotificationToSystems } from './sendNotification';


export const clickButtonRequest = async (
    buttonInfo, 
    valueTextSystems,
    isActivation,
    selectedRequestFolio, 
    dispatch
) => {
    
    let dateNow = 
        moment().format('DD/MMM/YY h:m:A').toUpperCase()
        .replace('.', '');

    //BUTTON AVAILABLE FOR EMPLOYEE FINANCE
    if(buttonInfo === 'AUTORIZAR'){
        const requestDatabase = await getRequest(selectedRequestFolio);

        requestDatabase.docs[0].ref.update({
            status: 1    
        });

        Swal.fire({
            icon: 'success',
            title: 'Listo...',
            text: 'Reporte autorizado',
        });

        let jsonDataDoc = requestDatabase.docs[0].data();
        jsonDataDoc.status = 1;

        sendNotificationToSystems(
            'SISTEMAS',
            jsonDataDoc,
            '' ,
            requestDatabase.docs[0].id
        );

    //BUTTON AVAILABLE FOR EMPLOYEE FINANCE
    } else if(buttonInfo === 'NO AUTORIZADO'){
        Swal.fire({
            icon: 'info',
            text: 'Reporte cancelado',
        });

        const requestDatabase = await getRequest(selectedRequestFolio);

        await requestDatabase.docs[0].ref.update({
            status: -2,
            completedDate: dateNow
        });

        let jsonDataDoc = requestDatabase.docs[0].data();

        sendNotificationToSystems(
            requestDatabase.docs[0].data().bussinesName,
            jsonDataDoc,
            '\n\n NO FUE AUTORIZADO',
            requestDatabase.docs[0].id
        );

        const requestUpdate = await getRequest(selectedRequestFolio);
            
        dispatch(addRequestCompleted());
    
        moveRequestDatabase(
            requestUpdate.docs[0], requestUpdate.docs[0].data()
        );

    //BUTTON AVAILABLE FOR EMPLOYEE BUSSINES
    } else if(buttonInfo === 'CANCELAR'){
        Swal.fire({
            icon: 'info',
            text: 'Reporte cancelado',
        });

        const requestDatabase = await getRequest(selectedRequestFolio);

        await requestDatabase.docs[0].ref.update({
            status: -1,
            completedDate: dateNow
        });

        let jsonDataDoc = requestDatabase.docs[0].data();

        sendNotificationToSystems(
            'SISTEMAS',
            jsonDataDoc,
            '\n\n FUE CANCELADO',
            requestDatabase.docs[0].id
        );

        const requestUpdate = await getRequest(selectedRequestFolio);
            
        dispatch(addRequestCompleted());
    
        moveRequestDatabase(
            requestUpdate.docs[0], requestUpdate.docs[0].data()
        );

    //BUTTON AVAILABLE FOR EMPLOYEE SYSTEMS
    } else if(buttonInfo === 'ENVIAR'){

        if(
            valueTextSystems.trim().length > 0 ||
            isActivation
        ){
            const requestDatabase = await getRequest(selectedRequestFolio);

            requestDatabase.docs[0].ref.update({
                status: 2,
            });

            if(!isActivation){
                requestDatabase.docs[0].ref.update({
                    solution: valueTextSystems,
                });
            }

            Swal.fire({
                icon: 'info',
                text: 'Solucion enviada',
            });

            let jsonDataDoc = requestDatabase.docs[0].data();

            sendNotificationToSystems(
                requestDatabase.docs[0].data().bussinesName,
                jsonDataDoc,
                '\n\n YA SE ATENDIO. \n EN ESPERA DE TU RESPUESTA...',
                requestDatabase.docs[0].id
            );

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'el campo no puede estar vacio',
            });
        }

    //BUTTON AVAILABLE FOR EMPLOYEE BUSSINES
    } else if(buttonInfo === 'LISTO'){
        Swal.fire({
            icon: 'success',
            title: 'Listo...',
            text: 'Reporte completado',
        });
        
        const requestDatabase = await getRequest(selectedRequestFolio);

        await requestDatabase.docs[0].ref.update({
            status: 3,
            completedDate: dateNow
        });
        
        const requestUpdate = await getRequest(selectedRequestFolio);
            
        dispatch(addRequestCompleted());
    
        moveRequestDatabase(
            requestUpdate.docs[0], requestUpdate.docs[0].data()
        );
    }
}


const getRequest = async (selectedRequestFolio) => {

    const result = await firebase.firestore()
        .collection('App-bitacora-soporte')
        .doc('reports')
        .collection('allReports')
        .where('folio', '==', selectedRequestFolio)
        .limit(1)
        .get();
    
    return result;
};


const moveRequestDatabase = async (docRef, data) => {
    await firebase.firestore()
        .collection('App-bitacora-soporte')
        .doc('reports')
        .collection('completed')
        .add(data);

    docRef.ref.delete();
};