import { useState } from 'react';

export default function Home() {
  const [datasetFile, setDatasetFile] = useState(null);
  const [scriptFile, setScriptFile] = useState(null);

  const handleDatasetChange = (event) => {
    const file = event.target.files[0];
    setDatasetFile(file);
  };

  const handleScriptChange = (event) => {
    const file = event.target.files[0];
    setScriptFile(file);
  };

  const handleSubmit = () => {
    // You can perform any necessary actions here, such as uploading the files to IPFS using Bacalhau
    console.log('Dataset file:', datasetFile);
    console.log('Script file:', scriptFile);
  };

  return (
    <div className="container">
      <h1 className="title">Upload Dataset & Scripts, Compute on IPFS with Bacalhau</h1>
      <div className="form-group">
        <label htmlFor="dataset">Dataset File:</label>
        <input type="file" id="dataset" onChange={handleDatasetChange} />
      </div>
      <div className="form-group">
        <label htmlFor="script">Script File:</label>
        <input type="file" id="script" onChange={handleScriptChange} />
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f8f8f8;
          padding: 20px;
        }

        .title {
          font-size: 28px;
          color: #333;
          margin-bottom: 20px;
          text-align: center;
        }

        .form-group {
          margin-bottom: 10px;
        }

        .submit-button {
          padding: 10px 20px;
          background-color: #0070f3;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        }

        .submit-button:hover {
          background-color: #0053a0;
        }
      `}</style>
    </div>
  );
}
