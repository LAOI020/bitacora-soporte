import React, { useState } from 'react';


export const CameraContainer = () => {

    const [imageSrc, setImageSrc] = useState(null);

    const takePhoto = () => {
        let canvas = document.getElementById('canvas-camera');
        
        let camera = document.getElementById('camera');

        canvas.getContext('2d').drawImage(
            camera, 0, 0, canvas.width, canvas.height
        );
        
        let dataUrl = canvas.toDataURL('image/jpg');

        setImageSrc(dataUrl);

        camera.srcObject.getTracks().forEach((track) => {
            if (track.readyState === 'live') {
                track.stop();
            }
        });
    }

    const exitCamera = () => {
        let camera = document.querySelector('#camera');

        camera.srcObject.getTracks().forEach((track) => {
            if (track.readyState === 'live') {
                track.stop();
            }
        });
    }

    const otherPhoto = async () => {
        setImageSrc(null);

        let camera = document.getElementById('camera');

        let stream = await navigator.mediaDevices.getUserMedia({ 
            video: true, audio: false 
        });

        camera.srcObject = stream;
    }

    return (
        <div className="camera-container">
            <video 
                id='camera'
                autoPlay
                style={{display: imageSrc ? 'none' : ''}}
            ></video>

            <div 
                className="canvas-camera-container"
                style={{display: imageSrc ? '' : 'none'}}
            >
                <canvas id='canvas-camera'></canvas>
            </div>
            

            {imageSrc ?
                <div className="buttons-camera">
                    <h5>LISTO</h5>
                    <h5 onClick={otherPhoto}>CANCELAR</h5>
                </div>
                :
                <div className="buttons-camera">
                    <h5 onClick={takePhoto}>TOMAR</h5>

                    <h5 onClick={exitCamera}>SALIR</h5>
                </div>
            }
        </div>
    )
}
