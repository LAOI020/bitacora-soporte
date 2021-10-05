
import firebase from '../database/config';
import { blobToBase64 } from './blobToBase64';
import { fetchHelper } from './fetchHelper';

export const sendNotificationToFinance = async (
    values, imageBase64, docRequestID, userInfo
) => {

    const docUserFinance = await firebase.firestore()
        .collection('App-bitacora-soporte')
        .doc('users')
        .collection('allUsers')
        .where('section', '==', userInfo.section)
        .limit(1)
        .get();

    if(!docUserFinance.docs[0]){
        return;
    }

    const numberPhoneFinance = 
        docUserFinance.docs[0].data().numberPhone;

    let data;

    if(Object.keys(values).length > 4){
        data = {
            sendTo: numberPhoneFinance,
            imageBase64: imageBase64,
            message: `UNIDAD: ${userInfo.section} \n ${userInfo.name} \n\n TIPO SOPORTE: ${values.supportType} \n\n ${values.type} \n\n ${values.clasification} \n\n NOMBRE: ${values.name} \n\n PRECIO: $${values.price} \n\n GRUPO: ${values.group} \n\n SUB-GRUPO: ${values.subGroup} \n\n AREA DE IMPRESION: ${values.printingArea} \n\n PRODUCTOS INCLUIDOS EN PAQUETE: ${values.productsInPackage} \n\n PROMOCION \n\n PRECIO: $${values.promotionPrice} \n\n DIAS: ${values.promotionDays} \n\n HORARIOS: ${values.promotionSchedule} \n\n VIGENCIA: ${values.promotionValidity} \n\n ${docRequestID}`
        }
    } else {
        data = {
            sendTo: numberPhoneFinance,
            imageBase64: imageBase64,
            message: `UNIDAD: ${userInfo.section} \n ${userInfo.name} \n\n TIPO SOPORTE: ${values.supportType} \n\n DESCRIPCION: ${values.description} \n\n ${docRequestID}`
        }
    }

    console.log('FETCH API');
    console.log(data);
    // data = {
    //     sendTo: "3331540437",
    //     imageBase64: "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAAQABAAD/4QBWRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAAABAAAAAQAAAAEAAAAB/9sAQwAQCwwODAoQDg0OEhEQExgoGhgWFhgxIyUdKDozPTw5Mzg3QEhcTkBEV0U3OFBtUVdfYmdoZz5NcXlwZHhcZWdj/9sAQwEREhIYFRgvGhovY0I4QmNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2Nj/8AAEQgAeAB4AwEiAAIRAQMRAf/EABsAAAEFAQEAAAAAAAAAAAAAAAACAwQFBgEH/8QANBAAAgICAQMCBQEHAwUAAAAAAQIAAwQRIQUSMUFRBhMiYXGBFCMyQlKRsUODoaLB0eHx/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAECAwT/xAAdEQEBAQEAAgMBAAAAAAAAAAAAARECITEDEkET/9oADAMBAAIRAxEAPwDdHmc1OzkzU5OTpnIw5I+Xl04dJtvsVEHqxnczJTExbL7DpUXc8x6v1HJzru++xnUMe1T4X8QkDZW/FvT1bSfMs/A1F4/xP0+5grs9RPjuHH9558hGtkc+8Dbz7R4NeqCxLED1sGU+CDsRDGYbofWXw7QjsTU3ke02iWC1FdTsMNgyQWTEmBMTA3Z0RBOooRB3xCEIBcmIijOSiciTFGV3XLLqul3PRsuB6edeuoBQ/GeeQ1eIp0oHzH+59BMS5Lgb95PzMm7Kte7IsL2N6mK6b097R3lS3sIbhyaiU4d138I0Pcx09MsHkiaGvFKLojUZtXRkfetP5xRfsNqHg7mo+Hc8fJGLcwDrwoJlaw1IeUShW1DpkPkRzrU3nG63Dch9Myxm4NV38xGm/I8yWI0O62IQhAOiEBCAXWpydnIwSZHzKRkYttJ/nUiPmIMA8x/ZSctam8l9Ee02OLjJj0BFUcjmUXVKTR8SEkDTOGUD2MuM/qVeIe0KXYeQPSR0148Q1lDsJle4L8ics6o+QxApKj7xD2tVWSeCZOL3TFqkGQ8kbqf8RNluRdYe1wB94hzYK2WznjgypEW6uvhK5ji31H+FXBH6zQqZm/hhDXi2Of524l+j7lskgGdiAYrcQKEICEAuokxXrEmMEkxtjFmNtAMx8R47nqONkoB2oVDc8/xe0X1dbh3Lj1gA722t/wD2S+tgKi2Fd8Bf+oH/ALQzlL+CRM7fLbnnwy3T3yVv/fDkkjUl9ZrCBAOCRzLPExqRazle5h+shdeG7F9wIlZkZ22h3GkYqd/8Rfy3WixWO+DrcmVAHnU5do/T9pWo+qw6QAuDWAeOf8yyQmV2AvZi1j7bk5DGzqUjmPqwMiIY8pgEgQjYaEYX8SZ3cSYyJMbaOExtoBHuRWH1DYkG7bV/p4lhZ4kOzXJ9ZHU/Wvx9fivRHVHIsKO3AI9JU9Xa19De2Gu5veWd5y1rDIlev13v7yizL727hpd755/9SY1vomptA78mCL828L6esZqNnd+80BJWAnda7+gEcnllb4WNfAj6GMLxHUMpkkKY6pjCmOqYA8DCNgwgbSmIMWYkyiIMbY6izGnMAasbiRX53HL7FRSzMFUckk6AkHFzK8x3agl604L+m/Ye8XXpXPsuw7rOpQ5RK2NvxLxl33ckH7Si6kt1TNsKy62GmUb1XWtyZYdL1+zsPXulaoLEkx+jKbF7tL3jyRvX9pc8MevS3IilMYxcujMr7qLA3uPBH5Eel2IPKY6pkdDHQYgd3CIBhA2rMbaOGU/WuuY3SlCsPmXsNrWDrj3J9IyT2OgZnurfEuJh91dBGRaP6T9I/J/8TN9T+IM3qO1ez5dR/wBOvgfr7ynLdx+wlSFqbn9Vys995FhKjkIOFH6S0+E89UazCsOix70+51yJm97UsfUzq2PVattbFXUggj0MOpswS5deiO/a4+8rOqL8wa3xDp3UV6ljltatUfUB7xm60WfTrmYZjo3YgBNKTIWZYKqHPqfpEtL0CdoPA1szNZl/z7mIP0A/TL5mo6uG6rHqcPWxVh4IOjL3B69vSZg/3FH+RM/OzVi3dTrYgetgynwVOwY6DMRh51+G/dS5APlTyD+RNL07q1ObpCPl3f0k8H8SbDWgMIkGEk2k6rmjp+BflMO75a8L7k8CeYZ2VblZFl1z91jnZMIS+SqGzaUn2jW/o0PLHUIRkW3AAHvA+PxCEYPYeZbg5AuoOj6g+CPYzS9Nupy3F+wE8sCfH5hCZ9xfF/FX8Q9WqyrTTic1jhn/AKvsPtKIwhKkxNu1zUIQjIRSsVIIOiPBEIQDW9JzjmYgLndifS/3+8IQkVUf/9k=",
    //     message: "UNIDAD: CHOLULA \n Armando Orozco \n\n TIPO SOPORTE: SOPORTE CORRECTIVO \n\n DESCRIPCION: despciocion fallo \n\n 6PMAjooabhvUuEHlXTpY"
    // }
    // fetchHelper(
    //     '/bitacora-soporte/send-message',
    //     data,
    //     'POST'
    // );
};


export const sendNotificationToSystems = async (
    sectionName, reportData, addText, docRequestID
) => {

    const docUserSystems = await firebase.firestore()
        .collection('App-bitacora-soporte')
        .doc('users')
        .collection('allUsers')
        .where('section', '==', sectionName)
        .limit(1)
        .get();

    if(!docUserSystems.docs[0]){
        return;
    }

    const numberPhoneSystems = 
        docUserSystems.docs[0].data().numberPhone;    

    let data;

    if(reportData.supportType === 'ACTIVACION'){
       
        let base64image;

        if(reportData.promotionPhoto){
            const blobImage = 
                await (await fetch(reportData.promotionPhoto)).blob(); 
    
            base64image = await blobToBase64(blobImage);
        }

        data = {
            sendTo: numberPhoneSystems,
            imageBase64: base64image,
            message: `UNIDAD: ${reportData.bussinesName} \n ${reportData.managerName} \n\n TIPO SOPORTE: ${reportData.supportType} \n\n ${reportData.type} \n\n ${reportData.clasification} \n\n NOMBRE: ${reportData.name} \n\n PRECIO: $${reportData.price} \n\n GRUPO: ${reportData.group} \n\n SUB-GRUPO: ${reportData.subGroup} \n\n AREA DE IMPRESION: ${reportData.printingArea} \n\n PRODUCTOS INCLUIDOS EN PAQUETE: ${reportData.productsInPackage} \n\n PROMOCION \n\n PRECIO: $${reportData.promotionPrice} \n\n DIAS: ${reportData.promotionDays} \n\n HORARIOS: ${reportData.promotionSchedule} \n\n VIGENCIA: ${reportData.promotionValidity} \n\n ${docRequestID} \n\n ${addText}`
        };

    } else {
        let base64image;

        if(reportData.photo){
            const blobImage = 
                await (await fetch(reportData.promotionPhoto)).blob(); 
    
            base64image = await blobToBase64(blobImage);
        }

        data = {
            sendTo: numberPhoneSystems,
            imageBase64: base64image,
            message: `UNIDAD: ${reportData.bussinesName} \n ${reportData.managerName} \n\n TIPO SOPORTE: ${reportData.supportType} \n\n DESCRIPCION: ${reportData.description} \n\n ${docRequestID} \n\n ${addText}`
        };
    }

    fetchHelper(
        '/bitacora-soporte/send-message',
        data,
        'POST'
    );
};