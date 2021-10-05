import React from 'react';
import { DescriptionContainer } from './DescriptionContainer';
import { PhotoContainer } from './PhotoContainer';


export const FormDesignTwo = ({
    values, changeTextarea, setPhoto, 
    imSystems, valueSystems, changeSystems
}) => {

    const {description, solution, photo} = values;

    return (
        <div className="request-header-flexRow">
            <DescriptionContainer
                isFormDesignOne={false}
                title="DESCRIPCION/FALLO"
                description={description}
                keyName={'description'}
                onChange={changeTextarea}
            />

            <PhotoContainer 
                isFormDesignOne={false}
                photo={photo}
                setPhoto={setPhoto}
                edit={changeTextarea ? true : false}
            />

            {imSystems ?
                <DescriptionSolution
                    value={valueSystems}
                    onChange={changeSystems}
                />
                :
                !changeTextarea ?                
                    <DescriptionContainer
                        isFormDesignOne={false}
                        title="SOLUCION"
                        description={solution}
                        keyName={'solution'}
                        onChange={changeTextarea}
                    />
                    :
                    null
            }
        </div>
    )
}

const DescriptionSolution = ({value, onChange}) => {
    return (
        <div className="formDesign-one-description">
            <div>
                <h5>SOLUCION</h5>
            </div>

            <textarea
                id='solution-systems'
                name='solution-systems'
                style={{height: '90px'}}
                value={value}
                onChange={onChange}
            />            
        </div>
    )
}
