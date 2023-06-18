import React from 'react';
import { fetchEnsAddress, fetchEnsName } from '@wagmi/core'
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { NextSeo } from 'next-seo'

const FetchENS = () => {
  let [status, setStatus] = useState<'idle' | 'fetching'>('idle')
  let [input, setInput] = useState('')
  let [resolved, setResolved] = useState('')

  async function submit() {
    try {
      setStatus('fetching')
      if (input.endsWith('.eth')) {
        let resolvedENS = await fetchEnsAddress({
          name: input,
        })
        setResolved(String(resolvedENS))
      } else {
        let resolvedAddress = await fetchEnsName({
          address: input as `0x{string}`,
        })
        setResolved(String(resolvedAddress))
      }
    } catch (error) {
      console.log(error)
    } finally {
      setStatus('idle')
    }
  }

  return (
    <div>
      <h3>Fetch ENS Address</h3>

      <FormControl>
        <FormLabel>ENS Name/Address</FormLabel>
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter a ENS Name/Address" />

        <Button mt={4} type="submit" onClick={submit} disabled={status === 'fetching'}>
          {status === 'idle' ? 'Fetch' : 'Fetching...'}
        </Button>

        {resolved && (
          <div>
            <h3>Resolved Value</h3>
            <p>{resolved}</p>
          </div>
        )}
      </FormControl>
    </div>
  )
};

export default FetchENS;
