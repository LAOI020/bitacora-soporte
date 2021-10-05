import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionSelectRequest } from '../actions/appActions';


export const RequestHeader = ({
    classStyle, request
}) => {

    const {
        bussinesName, 
        folio, 
        managerName,
        requestDate,
        completedDate,
        status

    } = request;

    const dispatch = useDispatch();

    const history = useHistory();

    const {
        allRequests, 
        requestsCompleted, 
        selectedRequestFolio

    } = useSelector(state => state.appReducer);

    const clickContainer = () => {
        if(classStyle === 'request-header-container'){

            let findRequest;

            findRequest = allRequests.find(
                reque => reque.folio === folio
            );

            if(!findRequest){
                findRequest = requestsCompleted.find(
                    reque => reque.folio === folio
                );
            }

            if(window.innerWidth > 1024){
    
                dispatch(actionSelectRequest(findRequest.folio));

            } else {
                history.push(`/report/${findRequest.folio}`);
            }
        }
    }

    return (
        <div 
            className={classStyle}
            onClick={clickContainer}
            style={{
                backgroundColor: 
                    status < 0 ?
                        'red'
                        :
                        selectedRequestFolio === folio &&
                        classStyle === 'request-header-container' ?
                            '#003537' : ''
            }}
        >    
            <div className="request-header-flexRow">
                <h5>{`UNIDAD : ${bussinesName}`}</h5>

                <h5>{`N° SOLICITUD : ${folio}`}</h5>
            </div>

            <h5>{`ENCARGADO : ${managerName}`}</h5>

            <div className="request-header-flexRow">
                <h5>{`FECHA SOLICITUD : ${requestDate}`}</h5>

                {completedDate ?
                    status < 0 ?
                        <h5>{`FECHA CANCELADA : ${completedDate}`}</h5>
                        :
                        <h5>{`FECHA ENTREGA : ${completedDate}`}</h5>
                    :
                    null
                }
            </div>

            <h5>STATUS</h5>

            {status === -2 ?
                <h5 style={{marginLeft: '1rem'}}>
                    NO AUTORIZADO
                </h5>
                :
                status === -1 ?
                    <h5 style={{marginLeft: '1rem'}}>
                        CANCELADO
                    </h5>
                    :
                    <div className="request-header-flexRow">
                        <StatusOption 
                            title="AUTORIZACION"
                            inCourse={status === 1 ? true : false}
                        />
                        <StatusOption 
                            title="ATENCION SOPORTE"
                            inCourse={status === 2 ? true : false}
                        />
                        <StatusOption 
                            title="RECEPCION TRABAJO"
                            inCourse={status === 3 ? true : false}
                        />
                    </div>
            }
        </div>
    )
}


const StatusOption = ({title, inCourse}) => {

    const style = {
        backgroundColor: inCourse ? 'black' : 'transparent' 
    };

    return (
        <div className="status-option">
            <div style={style}></div>

            <h6>{title}</h6>
        </div>
    )
}
