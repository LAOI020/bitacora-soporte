import React from 'react';


export const DescriptionContainer = ({
    isFormDesignOne, title, description,
    onChange, keyName
}) => {

    const formatCurrency = Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD'
    });

    return (
        <div className="formDesign-one-description">
            <div style={{
                height: 
                    isFormDesignOne &&
                    window.innerWidth > 1024 ? 
                        '60px' : ''
            }}>
                <h5>{title}</h5>
            </div>

            {onChange ?
                title === 'PRECIO' ?
                    <input
                        id={keyName}
                        name={keyName}
                        value={description}
                        onChange={onChange}
                        onSubmit={() => console.log('on submit')}
                        type="number"
                        inputMode='decimal'
                        step="0.01"
                    />
                    :
                    <textarea
                        id={keyName}
                        name={keyName}
                        value={description}
                        onChange={onChange}
                    />
                :
                <h5 style={{padding: '3px', textAlign: 'center'}}>
                    {title === 'PRECIO' ? 
                        formatCurrency.format(description)
                        :
                        description
                    }
                </h5>
            }
        </div>
    )
}
