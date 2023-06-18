import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, FormControl, FormGroup, FormLabel, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Web3 from 'web3';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const UploadDataset = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [account, setAccount] = useState<string>('');

  const connectWallet = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } else {
      alert('Ethereum browser extension like MetaMask is required.');
    }
  };

  const onFileUpload = () => {
    if (selectedFile) {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Make a POST request to upload the file using axios
      axios.post('/upload', formData)
        .then(response => {
          // Handle the response
          console.log(response);
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });
    }
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <Typography variant="h6">File Details:</Typography>
          <Typography>Name: {selectedFile.name}</Typography>
          <Typography>Size: {selectedFile.size} bytes</Typography>
          <Typography>Type: {selectedFile.type}</Typography>
        </div>
      );
    } else {
      return <Typography variant="h6">No file selected</Typography>;
    }
  };

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={connectWallet}>
        Connect to MetaMask
      </Button>
      {account && <Typography variant="h6">Connected: {account}</Typography>}
      <Typography variant="h2" align="center" gutterBottom color="primary">
        Upload Your Dataset and Script
      </Typography>
      <FormGroup>
        <FormLabel>
          <Typography variant="h6" gutterBottom>
            Dataset
          </Typography>
        </FormLabel>
        <StyledFormControl component="div">
          <input type="file" onChange={onChangeHandler} accept=".csv,.xlsx,.json" />
        </StyledFormControl>
        <Button variant="contained" color="primary" onClick={onFileUpload}>
          Upload!
        </Button>
      </FormGroup>
      {fileData()}
    </Container>
  );
};

export default UploadDataset;
