import React, { useState } from 'react';
import ipfsClient from 'ipfs-http-client';

const ipfs = ipfsClient({ host: 'localhost', port: '5001', protocol: 'http' });

const Game = () => {
  const [score, setScore] = useState(0);
  const [imageIndex, setImageIndex] = useState(1);
  const [uploadedImage, setUploadedImage] = useState(null);

  const nextImage = () => {
    if (imageIndex < 10) {
      setImageIndex(imageIndex + 1);
    } else {
      setImageIndex(1);
    }
    setScore(score + 1);
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    try {
      const addedImage = await ipfs.add(file);
      setUploadedImage(addedImage.cid.toString());
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="score-box">
          Score: {score}
        </div>
      </header>
      <div className="content">
        <div className="question">
          Is the Person Laughing??
        </div>
        {uploadedImage ? (
          <div className="image-container">
            <img className="image" src={`https://ipfs.io/ipfs/${uploadedImage}`} alt="Uploaded" />
            <div className="button-container">
              <button onClick={nextImage} className="action-button yes-button">Yes</button>
              <button onClick={nextImage} className="action-button no-button">No</button>
            </div>
          </div>
        ) : (
          <div className="image-upload">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
