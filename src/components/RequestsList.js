import React from 'react';
import { RequestHeader } from '../ui/RequestHeader';


export const RequestsList = ({
    searchValue, allRequests, requestsCompleted
}) => {
    return (
        <div>
            {allRequests.map(request => {
                const folio = request.folio.toUpperCase();
                const requestDate = request.requestDate.toUpperCase();
                let show;

                if(
                    folio.includes(searchValue.trim().toUpperCase()) ||
                    requestDate.includes(searchValue.trim().toUpperCase())
                ){
                    show = true;
                }

                return show ?
                    <RequestHeader
                        key={request.folio}
                        classStyle="request-header-container"
                        request={request}
                    />
                    :
                    null
            })}

            {searchValue.trim().length === 0 ?
                <div style={{
                    width: '100%',
                    height: '10px',
                    margin: '5rem 0px 5rem 0px',
                    borderRadius: '6px',
                    backgroundColor: 'rgb(205, 103, 10)'
                }}></div>
                :
                null
            }
            
            {requestsCompleted.map(request => {
                const folio = request.folio.toUpperCase();
                const requestDate = request.requestDate.toUpperCase();
                let show;

                if(
                    folio.includes(searchValue.trim().toUpperCase()) ||
                    requestDate.includes(searchValue.trim().toUpperCase())
                ){
                    show = true;
                }

                return show ?
                    <RequestHeader
                        key={request.folio}
                        classStyle="request-header-container"
                        request={request}
                    />
                    :
                    null
            })}
        </div>
    )
}
