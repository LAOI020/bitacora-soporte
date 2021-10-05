
import Compressor from 'compressorjs';
import Swal from 'sweetalert2';
import moment from 'moment';
import 'moment/locale/es-mx';
import firebase from '../database/config';
import { blobToBase64 } from './blobToBase64';
import { sendNotificationToFinance } from './sendNotification';


export const verifyRequest = async (
    values, exitRequest, keyPhoto, userInfo
) => {
    
    let requestIncomplete;

    const imageDataUrl = values[keyPhoto];

    for(let value in values){

        if(
            values[value] !== null &&
            values[value].trim().length === 0
        ){
            requestIncomplete = true;
        }
    }

    if(requestIncomplete){
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Solicitud incompleta',
        });
    }

    Swal.fire({
        icon: 'success',
        title: 'Listo...',
        text: 'Reporte enviado correctamente',
    });

    exitRequest();

    if(!imageDataUrl){
        const folioReport = await getFolioDatabase(userInfo);

        const docRequestID = 
            await sendRequestDatabase(values, folioReport, userInfo);
        
        sendNotificationToFinance(
            values, 
            imageDataUrl, 
            docRequestID,
            userInfo
        );

    } else {
        const blobImage = await compressImage(imageDataUrl);

        const folioReport = await getFolioDatabase(userInfo);

        const fileImageUrl = 
            await sendPhotoDatabase(folioReport, blobImage);
        
        values[keyPhoto] = fileImageUrl;
        
        const docRequestID =
            await sendRequestDatabase(values, folioReport, userInfo);

        const base64Image = await blobToBase64(blobImage);

        sendNotificationToFinance(
            values,
            base64Image,
            docRequestID,
            userInfo
        );
    }
};


const compressImage = async (imageDataUrl) => {

    const blobImage = await (await fetch(imageDataUrl)).blob(); 
        
    const imageFile = 
        new File([blobImage], `${Date.now().toString()}.jpg`, {type:"image/jpg"});
    
    function getFileCompress(fileImage){
        return new Promise((resolve) => {

            new Compressor(fileImage, {
                quality: 0.6,
                success(resultFileImage){

                    resolve(resultFileImage);
                }
            });
        });
    }

    const blobImageCompress = await getFileCompress(imageFile);

    return blobImageCompress;
};


const getFolioDatabase = async (userInfo) => {

    const docIndexReports = await firebase.firestore()
        .collection('App-bitacora-soporte')
        .doc('indexReports')
        .get();

    const folioReport = 
        `${userInfo.section[0]}${docIndexReports.data()[userInfo.section]}`;

    docIndexReports.ref.update({
        [userInfo.section] : firebase.firestore.FieldValue.increment(1)
    });

    return folioReport;
};


const sendRequestDatabase = async (
    values, folioReport, userInfo
) => {
    
    let dateNow = 
        moment().format('DD/MMM/YY h:m:A').toUpperCase()
        .replace('.', '');

    const report = {
        folio: folioReport,
        bussinesName: userInfo.section,
        managerName: userInfo.name,
        requestDate: dateNow,
        dateMilliseconds: Date.now(),
        completedDate: null,
        status: 0,
        ...values,
    };

    const docReport = await firebase.firestore()
        .collection('App-bitacora-soporte')
        .doc('reports')
        .collection('allReports')
        .add(report);

    return docReport.id;
};


const sendPhotoDatabase = async (folio, file) => {
    
    const refStorage = firebase.storage().ref()
        .child(`reports-bitacora/${folio}.jpg`);

    const uploadFile = await refStorage.put(file);

    const fileUrl = await uploadFile.ref.getDownloadURL();

    return fileUrl;
};