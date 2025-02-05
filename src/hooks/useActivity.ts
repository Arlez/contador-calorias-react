import { useContext } from 'react'
import { ActivityContext } from '../context/ActivityContext'

export const useActivity = () => {
    const context = useContext(ActivityContext)
    if(!context){
        throw new Error('El hook useActivity debe ser usado en un ActivityProvider')
    }
    return context
}
