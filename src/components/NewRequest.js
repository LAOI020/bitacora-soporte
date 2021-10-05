import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionMakeNewRequest } from '../actions/appActions';
import { verifyRequest } from '../helpers/sendRequest';
import { FormDesignOne } from '../ui/FormDesignOne';
import { FormDesignTwo } from '../ui/FormDesignTwo';
import { SupportType } from '../ui/SupportType';


export const NewRequest = () => {

    const dispatch = useDispatch();

    const {userInfo} = useSelector(state => state.appReducer);

    const exitRequest = ()  => {
        dispatch(actionMakeNewRequest(false));
    }

    const [valueSupportType, setValueSupportType] = 
        useState('ACTIVACION');
    
    const [formDesignOneValues, setFormDesignOneValues] = 
        useState({
            type: 'PRODUCTO',
            clasification: 'NUEVO',
            name: '',
            price: '',
            group: '',
            subGroup: '',
            printingArea: '',
            productsInPackage: '',
            promotionPrice: '',
            promotionDays: '',
            promotionSchedule: '',
            promotionValidity: '',
            promotionPhoto: null
        });
    
    const [formDesignTwoValues, setFormDesignTwoValues] = 
        useState({
            description: '',
            photo: null,
        });
    
    const changeSelectSupportType = (e) => {
        setValueSupportType(e.target.value);
    }

    const changeSelectFormOne = (e) => {
        setFormDesignOneValues((values) => ({
            ...values,
            [e.target.name] : e.target.value
        }));
    }

    const changeTextarea = (e) => {
        setFormDesignOneValues((values) => ({
            ...values,
            [e.target.name] : e.target.value
        }));
    }

    const changeTextareaFormTwo = (e) => {
        setFormDesignTwoValues((values) => ({
            ...values,
            [e.target.name] : e.target.value
        }));
    }

    const setPhoto = (file) => {
        let reader = new FileReader();

        reader.onloadend = () => {
            setFormDesignOneValues((values) => ({
                ...values,
                promotionPhoto : reader.result
            }));
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setFormDesignOneValues((values) => ({
                ...values,
                promotionPhoto : null
            }));
        }
    }

    const setPhotoFormTwo = (file) => {
        let reader = new FileReader();

        reader.onloadend = () => {
            setFormDesignTwoValues((values) => ({
                ...values,
                photo : reader.result
            }));
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setFormDesignTwoValues((values) => ({
                ...values,
                photo : null
            }));
        }
    }

    const sendRequest = () => {

        let request;

        if(valueSupportType === 'ACTIVACION'){
            request = {
                ...formDesignOneValues,
                supportType: valueSupportType
            };

            verifyRequest(
                request, 
                exitRequest, 
                'promotionPhoto',
                userInfo
            );

        } else {
            request = {
                ...formDesignTwoValues,
                solution: null,
                supportType: valueSupportType
            };

            verifyRequest(
                request, 
                exitRequest, 
                'photo',
                userInfo
            );
        }
    }

    return (
        <div 
            className="newRequest-container"
            style={{
                alignItems: window.innerWidth < 1024 ?
                    'start' : ''
            }}
        >
            
            <div>
                <SupportType
                    value={valueSupportType}
                    changeSelect={changeSelectSupportType}
                />

                {valueSupportType === 'ACTIVACION' ?
                    <FormDesignOne
                        values={formDesignOneValues}
                        changeSelect={changeSelectFormOne}
                        changeTextarea={changeTextarea}
                        setPhoto={setPhoto}
                    />
                    :
                    <FormDesignTwo
                        values={formDesignTwoValues}
                        changeTextarea={changeTextareaFormTwo}
                        setPhoto={setPhotoFormTwo}
                    />
                }

                <div className="newRequest-buttons-container">
                    <button onClick={sendRequest}>
                        ENVIAR
                    </button>

                    <button onClick={exitRequest}>
                        CANCELAR
                    </button>
                </div>
            </div>
        </div>
    )
}
