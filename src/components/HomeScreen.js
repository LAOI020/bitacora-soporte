import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionMakeNewRequest } from '../actions/appActions';
import { LoadDataContainer } from '../ui/LoadDataContainer';
import { MenuFAT } from '../ui/MenuFAT';
import { RequestHeader } from '../ui/RequestHeader';
import { NewRequest } from './NewRequest';


export const HomeScreen = () => {

    const history = useHistory();

    const dispatch = useDispatch();

    const {allRequests,makeNewRequest, userInfo} = 
        useSelector(state => state.appReducer);
    
    const [searchValue, setSearchValue] = useState('');

    const [showFAT, setShowFAT] = useState(false);
    
    const showMakeNewRequest = (value) => {
        dispatch(actionMakeNewRequest(value));
    };

    const changeSearchInput = (e) => {
        setSearchValue(e.target.value);
    };

    const clickButtonFAT = (btn) => {
        if(btn === 'MENU'){
            setShowFAT((value) => !value);

        } else if(btn === 'CREAR'){
            showMakeNewRequest(true);

        } else if(btn === 'SALIR'){
            localStorage.clear();

            history.replace('/login');
        }
    };
    
    return (
        !userInfo ?
            <LoadDataContainer/>
            :
            <div className="home-container">
                <MenuFAT
                    section={userInfo.section}
                    click={clickButtonFAT}
                    showFAT={showFAT}
                />
                
                <div className="container-requests">
                    <div style={{
                        position: 'fixed',
                        top: '8px',
                        width: '90%',
                        padding: '7px',
                        backgroundColor: '#017F83'
                    }}>
                        {searchValue.trim().length > 0 ?
                            <h4
                                style={{cursor: 'pointer'}}
                                onClick={() => setSearchValue('')}
                            >
                                Cancelar
                            </h4>
                            :
                            <h4>Buscar</h4>
                        }

                        <input
                            id='input-search-request'
                            name='input-search-request'
                            style={{
                                color: 'black',
                                backgroundColor: 'white'
                            }}
                            value={searchValue}
                            onChange={changeSearchInput}
                        />
                    </div>
                    
                    {makeNewRequest ? 
                        <NewRequest/> 
                        : 
                        null
                    }
                    
                    <div style={{height: '4rem'}}></div>
                    
                    <div>
                        {allRequests.map(request => (
                            <RequestHeader
                                key={request.folio}
                                classStyle="request-header-container"
                                request={request}
                            />
                        ))}

                        <div style={{height: '4rem'}}></div>
                    </div>
                </div>
            </div>
    )
};