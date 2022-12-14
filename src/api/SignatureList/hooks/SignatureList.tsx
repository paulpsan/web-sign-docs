import React, { useEffect, useState } from 'react'

export const SignatureList = () => {
    const [isLoading, setisLoading] = useState(true)
    const [dataSignature, setdataSignature] = useState([])

    useEffect(() => {

    }, [])
  return {
    isLoading,
    setisLoading,
    dataSignature,
    setdataSignature
  }
}
