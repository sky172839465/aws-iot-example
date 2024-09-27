import { get } from 'lodash-es'
import { useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { SWRConfig } from 'swr'

import fetcher from '../../utils/fetcher'

const Root = (props) => {
  const { children } = props
  const errorToastIdRef = useRef()
  const errorToastKeyRef = useRef()

  const onError = (error, key) => {
    errorToastIdRef.current = key
    console.log(error)
    errorToastKeyRef.current = toast.error(get(error, 'message', 'error'))
  }

  const onSuccess = (data, key) => {
    if (key !== errorToastKeyRef.current) {
      return
    }
    toast.dismiss(errorToastIdRef.current)
  }

  return (
    <>
      <SWRConfig
        value={{
          // https://swr.vercel.app/docs/api
          revalidateOnFocus: false,
          keepPreviousData: true,
          errorRetryCount: 3,
          suspense: false,
          fetcher,
          onError,
          onSuccess
        }}
      >
        {children}
      </SWRConfig>
      <Toaster />
    </>
  )
}

export default Root