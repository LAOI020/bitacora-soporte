import React from 'react';


export const MenuFAT = ({section, click, showFAT}) => {
    return (
        <div className="FAT-create">
            {showFAT ?
                <>
                    <h5 onClick={() => click('CREAR')}>
                        CREAR
                    </h5>
                    <h5 onClick={() => click('SALIR')}>
                        SALIR
                    </h5>
                </>
                :
                null
            }

            {section === 'FINANZAS' || section === 'SISTEMAS' ?

                <h5 
                    style={{
                        color: 'white', 
                        backgroundColor: 'red'
                    }}
                    onClick={() => click('SALIR')}
                >
                    SALIR
                </h5>
                :
                <h5
                    style={{
                        color: '#017F83', 
                        backgroundColor: 'white'
                    }}
                    onClick={() => click('MENU')}
                >
                    MENU
                </h5>
            }
        </div>
    )
}
