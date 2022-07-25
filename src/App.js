import React, { useState, useEffect } from 'react';

import {
  getImageMethod,
  uploadImageMethod,
  deleteImageMethod
} from './api';

import './style.css';

const App = () => {
  const [imageObject, setImageObject] = useState(null);

  useEffect(() => {
    getImageHandler();
  }, []);

  const getImageHandler = () => {
    getImageMethod().then(res => {
      if (res?.success) {
        if (res.randomImage._id === imageObject?._id) {
          getImageHandler();
        } else {
          setImageObject({
            ...res.randomImage,
            image: `data:image/jpeg;base64,${res.randomImage.image}`
          })
        }
      } else {
        console.log(res?.message || 'Something went wrong, try again');
      }
    })
  }

  const uploadImageHandler = (event) => {
    const uploadedImage = event.target.files[0];

    let data = new FormData();
    data.append('file', uploadedImage, uploadedImage.name);

    uploadImageMethod(data).then(res => {
      if (res?.success) {
        if (!imageObject) {
          getImageHandler()
        }
      } else {
        console.log(res?.message || 'Something went wrong, try again');
      }

      event.target.value = '';
    })
  }

  const deleteImageHandler = (imageId) => {
    deleteImageMethod(imageId).then(res => {
      if (res?.success) {
        getImageHandler();
      } else  {
        console.log(res?.message || 'Something went wrong, try again');
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        {imageObject &&
          <button
            className='delete-button'
            onClick={() => deleteImageHandler(imageObject?._id)}
          >
            Delete image
          </button>
        }
        <img 
          src={imageObject?.image}
          alt="Loading..."
          className="App-logo"
          onClick={() => getImageHandler()}
        />
        <input 
          type="file" 
          accept='image/png, image/jpeg'
          enctype="multipart/form-data"
          multiple={false}
          onChange={(event) => uploadImageHandler(event)}
        />
      </header>
    </div>
  );
}

export default App;
