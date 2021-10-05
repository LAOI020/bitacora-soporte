import React from 'react';


export const SupportType = ({value, changeSelect}) => {
    return (
        <div className="supportType-container">
            {changeSelect ?
                <>
                <h5>TIPO SOPORTE</h5>
                
                <select 
                    value={value} 
                    onChange={changeSelect}
                >
                    <option value="ACTIVACION">
                        ACTIVACION
                    </option>
                    <option value="SOPORTE CORRECTIVO">
                        SOPORTE CORRECTIVO
                    </option>
                    <option value="SOPORTE PREVENTIVO">
                        SOPORTE PREVENTIVO
                    </option>
                    <option value="ASISTENCIA TECNICA">
                        ASISTENCIA TECNICA
                    </option>
                </select>
                </>
                :
                <h5>TIPO SOPORTE : {value}</h5>
            }
        </div>
    )
}
