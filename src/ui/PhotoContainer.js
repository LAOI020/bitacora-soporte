import React from 'react';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';


export const PhotoContainer = ({
    isFormDesignOne, photo, setPhoto, edit
}) => {

    const {makeNewRequest} = 
        useSelector(state => state.appReducer);

    const addPhoto = async () => {
        document.getElementById('input-photo').click();
    }

    const changeInput = (e) => {
        setPhoto(e.target.files[0]);
    }

    const clickImage = () => {
        Swal.fire({
            showConfirmButton: false,
            imageUrl: photo,
            // imageWidth: '100vw',
            imageHeight: window.innerWidth > 1024 ? '95vh' : '70vh',
            customClass: 'custom-swal-image'
        })
    }

    return (
        <div className="formDesign-one-description">
            <div style={{
                height: 
                    isFormDesignOne &&
                    window.innerWidth > 1024 ? 
                        '60px' : ''
            }}>
                <h5>FOTO</h5>
            </div>

            {photo ?
                <div style={{height: '73px'}}>
                    <img
                        src={photo}
                        alt=''
                        style={{
                            height:'100%',
                            width: makeNewRequest ? '40%' : ''
                        }}
                        onClick={clickImage}
                    />
                </div>
                :
                edit ?
                    <div style={{height: '73px'}}>
                        <h6 onClick={addPhoto}>FOTO</h6>

                        <input
                            id='input-photo'
                            name='input-photo'
                            type='file'
                            accept='image/png, image/jpeg, image/jpg'
                            onChange={changeInput}
                            style={{display: 'none'}}
                        />
                    </div>
                    :
                    <h5 style={{
                        textAlign: 'center',
                        marginTop: '3px'
                    }}>
                        N/A
                    </h5>
            }
        </div>
    )
}
