import React from 'react';

export const LoadDataContainer = () => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: window.innerHeight,
            width: '100vw',
            backgroundColor: 'white'
        }}>
            <div style={{
                display: 'flex',
                height: '25%', 
                width: window.innerWidth < 1024 ? '90%' : '40%'
            }}>
                <img
                    className='shimmer'
                    src={process.env.REACT_APP_LOGO_CSA}
                    alt=''
                    style={{minHeight: '100%', minWidth: '100%'}}
                />
            </div>
        </div>
    )
}
