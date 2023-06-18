import { Text } from '@chakra-ui/react'
import { Head } from 'components/layout/Head'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { LinkComponent } from 'components/layout/LinkComponent'

import FetchENS from 'components/fetch-ens';

import Logo from 'assets/images/logo.png';

import Web3StorageIPFS from 'components/ipfs/web3_storage';

export default function Home() {
  return (
    <>
      <Head />

      <main className='flex flex-col gap-4'>
        <img src={Logo.src}/>

        <Web3StorageIPFS />

        <FetchENS />

      </main>
    </>
  )
}
