import React, { useState, useEffect } from 'react';

import {
  getImageMethod,
  uploadImageMethod,
} from './api';

import './style.css';

const App = () => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    getImageHandler();
  }, []);

  const getImageHandler = () => {
    getImageMethod().then(res => {
      if (res?.status <= 200) {
        setImageUrl(`data:image/jpeg;base64,${res.data.image}`)
      } else {
        console.log('Something went wrong, try again');
      }
    })
  }

  const uploadImageHandler = (event) => {
    const uploadedImage = event.target.files[0];

    let data = new FormData();
    data.append('file', uploadedImage, uploadedImage.name);

    uploadImageMethod(data).then(res => {
      if (res?.status <= 200) {
        console.log(res.data);

        if (!imageUrl) {
          getImageHandler()
        }
      } else {
        console.log('Something went wrong, try again');
      }

      event.target.value = '';
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img 
          src={imageUrl}
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
