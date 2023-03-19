import { useEffect, useState, useRef } from 'react'
import { projectFirestore } from '@/firebase/config'

export const useCollection = (collection, user, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  const orderBy = useRef(_orderBy).current

  useEffect(() => {
    let ref = projectFirestore.collection(collection)

    if (user) {
      ref = ref.where('uid', '==', user.uid)
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy)
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = []
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id })
        })

        // update state
        setDocuments(results)
        setError(null)
      },
      (error) => {
        console.log(error)
        setError('could not fetch the data')
      }
    )

    // unsubscribe on unmount
    return () => unsubscribe()
  }, [collection, user, orderBy])

  return { documents, error }
}
