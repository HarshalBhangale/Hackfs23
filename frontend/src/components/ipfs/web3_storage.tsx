import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Web3Storage } from 'web3.storage';

const WEB3_TOKEN = process.env.NEXT_PUBLIC_WEB3_STORAGE_KEY || '';

const Web3StorageIPFS = () => {
    const [selectedFile, setSelectedFile] = useState<any>();
    const [cid, setCid] = useState<string>('');
    const [web3Client, setWeb3Client] = useState<Web3Storage>();

    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            console.log('Please select a file first.');
            return;
        }

        await uploadToIpfs([selectedFile]);
    };

    const uploadToIpfs = async (files: any[]) => {
        if (web3Client) {
            const cid = await web3Client.put(files, {
                name: 'cat pics',
                maxRetries: 3,
            });

            console.log(cid);
        }
    };

    const retrieveFiles = async () => {
        if (web3Client) {
            const res = await web3Client.get(cid); // Web3Response
            if (res) {
                const files = await res.files(); // Web3File[]
                for (const file of files) {
                    console.log(`${file.cid} ${file.name} ${file.size}`);
                }
            }
        }
    };

    const onCidChange = async (e: any) => {
        setCid(e.target.value);
    };

    useEffect(() => {
        const client = new Web3Storage({ token: WEB3_TOKEN });
        setWeb3Client(client);
    }, [])

    return (
        <div className='flex flex-col gap-4'>
            <h3>Upload dataset</h3>
            <div className='flex flex-row gap-4'>
                <input type='file' placeholder='upload data file' onChange={handleFileChange} />
                <Button onClick={handleUpload}>Upload</Button>
            </div>
            <div>
                <input type='text' placeholder='enter cid' onChange={onCidChange} />
                <Button onClick={retrieveFiles}>Retrieve CID</Button>
            </div>
        </div>
    );
};

export default Web3StorageIPFS;