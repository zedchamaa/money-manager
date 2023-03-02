import { useState, useEffect } from 'react'
import { projectAuth } from '@/firebase/config'
import { useAuthContext } from '@/useAuthContext'
import { useNavigate } from 'react-router-dom'

export const useResetPassword = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [timerId, setTimerId] = useState('')
  const navigate = useNavigate()
  const { dispatch } = useAuthContext()

  const resetPassword = async (email) => {
    setError(null)
    setIsPending(true)

    try {
      // reset password
      await projectAuth.sendPasswordResetEmail(email)

      // get the user that requested the password reset
      const user = projectAuth.currentUser

      // dispatch the RESET_PASSWORD action with the user
      dispatch({ type: 'RESET_PASSWORD', payload: user })

      // set the message
      setMessage('Check your inbox for further instructions.')

      setTimerId(
        setTimeout(() => {
          navigate('/login')
        }, 5000)
      )

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        console.error(err)
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  // clear timer when component unmounts
  useEffect(() => {
    return () => {
      clearTimeout(timerId)
    }
  }, [timerId])

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { resetPassword, isPending, error, message }
}
