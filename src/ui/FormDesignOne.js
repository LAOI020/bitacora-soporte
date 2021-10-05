import React from 'react';
import { DescriptionContainer } from './DescriptionContainer';
import { PhotoContainer } from './PhotoContainer';


export const FormDesignOne = ({
    values, changeSelect, changeTextarea, setPhoto
}) => {

    const keyPressEvent = (e) => {
        if(e.key === 'Enter'){
            let focusedElement = 
                document.querySelector(':focus');
            
            let keys = Object.keys(values);

            let nextIndex = 
                keys.indexOf(focusedElement.name) + 1;

            let nextItem = keys[nextIndex];

            if(
                nextItem === 'promotionPhoto' || 
                nextItem === 'photo'
            ){
                if(document.activeElement instanceof HTMLElement){
                    document.activeElement.blur();
                }

            } else if(document.getElementById(nextItem)){
                document.getElementById(nextItem).focus();
                
            } else {
                if(document.activeElement instanceof HTMLElement){
                    document.activeElement.blur();
                }
            }
        }
    }

    return (
        <div>
            <DropDownsRow
                valueType={values.type}
                valueClasification={values.clasification}
                changeSelect={changeSelect}
            />

            <div 
                className="form-design-one-container"
                onKeyUp={keyPressEvent}
            >
                <DescriptionContainer
                    isFormDesignOne={true}
                    title="NOMBRE"
                    description={values.name}
                    keyName={'name'}
                    onChange={changeTextarea}
                />
                <DescriptionContainer
                    isFormDesignOne={true}
                    title="PRECIO"
                    description={values.price}
                    keyName={'price'}
                    onChange={changeTextarea}
                />
                <DescriptionContainer
                    isFormDesignOne={true}
                    title="GRUPO"
                    description={values.group}
                    keyName={'group'}
                    onChange={changeTextarea}
                />
                <DescriptionContainer
                    isFormDesignOne={true}
                    title="SUB-GRUPO"
                    description={values.subGroup}
                    keyName={'subGroup'}
                    onChange={changeTextarea}
                />
                <DescriptionContainer
                    isFormDesignOne={true}
                    title="AREA DE
                    IMPRESION"
                    description={values.printingArea}
                    keyName={'printingArea'}
                    onChange={changeTextarea}
                />
                <DescriptionContainer
                    isFormDesignOne={true}
                    title="PRODUCTOS
                    INCLUIDOS EN
                    PAQUETE
                    "
                    description={values.productsInPackage}
                    keyName={'productsInPackage'}
                    onChange={changeTextarea}
                />
            </div>

            <h5 style={{
                textAlign: 'center', 
                margin: '1rem 0px 0.5rem 0px'
            }}>
                PROMOCION
            </h5>

            <div 
                className="form-design-one-container"
                onKeyUp={keyPressEvent}
            >
                <DescriptionContainer 
                    isFormDesignOne={true}
                    title="PRECIO"
                    description={values.promotionPrice}
                    keyName={'promotionPrice'}
                    onChange={changeTextarea}
                />
                <DescriptionContainer
                    isFormDesignOne={true}
                    title="DIAS"
                    description={values.promotionDays}
                    keyName={'promotionDays'}
                    onChange={changeTextarea}
                />
                <DescriptionContainer
                    isFormDesignOne={true}
                    title="HORARIOS"
                    description={values.promotionSchedule}
                    keyName={'promotionSchedule'}
                    onChange={changeTextarea}
                />
                <DescriptionContainer
                    isFormDesignOne={true}
                    title="VIGENCIA"
                    description={values.promotionValidity}
                    keyName={'promotionValidity'}
                    onChange={changeTextarea}
                />
                <PhotoContainer 
                    isFormDesignOne={true}
                    photo={values.promotionPhoto}
                    setPhoto={setPhoto}
                    edit={changeTextarea ? true : false}
                />
            </div>
        </div>
    )
}


const DropDownsRow = ({
    valueType, valueClasification, changeSelect
}) => {
    return (
        <div className="formDesign-one-dropdowns-container">
            {changeSelect ?
                <>
                <select 
                    name="type"
                    value={valueType} 
                    onChange={changeSelect}
                >
                    <option value="PRODUCTO">PRODUCTO</option>
                    <option value="PAQUETE">PAQUETE</option>
                    <option value="PROMOCION">PROMOCION</option>
                </select>

                <select 
                    name="clasification"
                    value={valueClasification} 
                    onChange={changeSelect}
                >
                    <option value="NUEVO">NUEVO</option>
                    <option value="EDITAR">EDITAR</option>
                </select>
                </>

                :
                
                <>
                <h5>{valueType}</h5>
                <h5>{valueClasification}</h5>
                </>
            }
        </div>
    )
}
