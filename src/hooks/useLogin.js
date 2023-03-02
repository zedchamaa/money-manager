import { useState } from 'react'
import { projectAuth } from '@/firebase/config'
import { useAuthContext } from '@/hooks/useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    try {
      // login
      const res = await projectAuth.signInWithEmailAndPassword(email, password)

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      setIsPending(false)
      setError(null)
    } catch (err) {
      console.error(err)
      setError(err.message)
      setIsPending(false)
    }
  }

  return { login, isPending, error }
}
