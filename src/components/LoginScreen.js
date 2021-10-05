import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { checkLoginUser, loginUser } from '../helpers/verifyUser';


export const LoginScreen = () => {

    const history = useHistory();

    const dispatch = useDispatch();

    const {userInfo} = useSelector(state => state.appReducer);

    const [valueCode, setValueCode] = useState('');

    useEffect(() => {
        console.log('use effect login screen');
        if(!userInfo){
            if(localStorage.getItem('rlwertk')){
                dispatch(checkLoginUser(history, dispatch));
            }
        }

    }, [dispatch, history, userInfo]);

    console.log('login screen');

    const changeInput = (e) => {
        setValueCode(e.target.value);
    };

    const clickButtonLogin = () => {
        loginUser(valueCode, history, dispatch);
    }

    return (
        <div className="loginScreen-container">
            <div>
                <img
                    src={process.env.REACT_APP_LOGO_CSA}
                    alt='logo'
                />

                <h4>Iniciar Sesion</h4>

                <input
                    className='input-code-login'
                    id='code-input-login'
                    name='code-input-login'
                    type='password'
                    value={valueCode}
                    onChange={changeInput}
                />

                <button
                    className='btn-loginScreen'
                    onClick={clickButtonLogin}
                >
                    ENTRAR
                </button>
            </div>
        </div>
    )
}
