import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionMakeNewRequest } from '../actions/appActions';
import { unsubscriteFirebase } from '../database/listeningUpdateRequests';
import { LoadDataContainer } from '../ui/LoadDataContainer';
import { MenuFAT } from '../ui/MenuFAT';
import { RequestComplete } from '../ui/RequestComplete';
import { NewRequest } from './NewRequest';
import { RequestsList } from './RequestsList';


export const HomeScreenDesktop = () => {

    const history = useHistory();

    const dispatch = useDispatch();

    console.log('resconstruye el componente');

    const {
        userInfo,
        allRequests, 
        requestsCompleted,
        selectedRequestFolio, 
        makeNewRequest

    } = useSelector(state => state.appReducer);

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

            unsubscriteFirebase();
            
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

                {makeNewRequest ? 
                    <NewRequest/> 
                    : 
                    null
                }

                <div className="container-requests">
                    <div>
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
                            value={searchValue}
                            onChange={changeSearchInput}
                        />
                    </div>

                    <RequestsList
                        searchValue={searchValue}
                        allRequests={allRequests}
                        requestsCompleted={requestsCompleted}
                    />

                </div>

                {selectedRequestFolio ?
                    <RequestComplete/>
                    :
                    null
                }
            </div>
    )
};
