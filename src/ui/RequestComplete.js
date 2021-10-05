import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clickButtonRequest } from '../helpers/clickButtonRequest';
import { FormDesignOne } from './FormDesignOne';
import { FormDesignTwo } from './FormDesignTwo';
import { RequestHeader } from './RequestHeader';
import { SupportType } from './SupportType';


export const RequestComplete = () => {
    
    if(window.innerWidth < 1024){
        window.scrollTo(0, 0);
    }

    const {id} = useParams();

    const dispatch = useDispatch();

    const {
        allRequests, 
        requestsCompleted,
        selectedRequestFolio, 
        userInfo

    } = useSelector(state => state.appReducer);
    
    let folioRequest;

    if(id){
        folioRequest = id;
    } else {
        folioRequest = selectedRequestFolio;
    }

    let request;

    request = allRequests.find(
        reque => reque.folio === folioRequest
    );

    if(!request){
        request = requestsCompleted.find(
            reque => reque.folio === folioRequest
        );
    }

    const [valueSystems, setValueSystems] = useState('');

    let buttonInfo;

    if(
        userInfo.section === 'FINANZAS' &&
        request.status === 0
    ){
        buttonInfo = 'AUTORIZAR';

    } else if(
        userInfo.section === request.bussinesName &&
        request.status === 1
    ){
        buttonInfo = 'CANCELAR';

    } else if(
        userInfo.section === 'SISTEMAS' && 
        request.status === 1
    ){
        buttonInfo = 'ENVIAR';

    } else if(
        userInfo.section === request.bussinesName && 
        request.status === 2
    ){
        buttonInfo = 'LISTO';
    }

    const changeValueSystems = (e) => {
        setValueSystems(e.target.value);
    }

    const clickButton = () => {
        clickButtonRequest(
            buttonInfo, 
            valueSystems,
            request.supportType === 'ACTIVACION' ? true : null,
            folioRequest,
            dispatch
        );
    };

    const notAuthorized = () => {
        clickButtonRequest(
            'NO AUTORIZADO', 
            valueSystems, 
            null,
            folioRequest,
            dispatch
        );
    };

    return (
        <div className="requestComplete-container">
            <div style={{
                height: 'auto', 
                backgroundColor: request.status >= 0 ? 
                    '#017F83' : 'red',
                borderRadius: '10px'
            }}>
                <RequestHeader 
                    classStyle="request-header-container-disableHover"
                    request={request}
                />

                <div 
                    className="request-details-container"
                    style={{
                        backgroundColor: request.status < 0 ?
                            'red' : ''
                    }}
                >
                    <SupportType
                        value={request.supportType}
                    />

                    {request.supportType === 'ACTIVACION' ?
                        <FormDesignOne
                            values={request}
                        />
                        :
                        <FormDesignTwo
                            values={request}
                            imSystems={
                                buttonInfo === 'ENVIAR' ? 
                                    true : false
                            }
                            valueSystems={valueSystems}
                            changeSystems={changeValueSystems}
                        />
                    }

                    {request.status >= 0 ?
                        <div className="container-btn-requestDetails">
                            {buttonInfo &&
                                <button 
                                    className={`btn-requestDetails-${buttonInfo}`}
                                    onClick={clickButton}
                                >
                                    {buttonInfo}
                                </button>
                            }
                        </div>
                        :
                        null
                    }

                    {buttonInfo === 'AUTORIZAR' ?
                        <div className="container-btn-requestDetails">
                            <button 
                                className='btn-requestDetails-CANCELAR'
                                onClick={notAuthorized}
                            >
                                CANCELAR
                            </button>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
}
