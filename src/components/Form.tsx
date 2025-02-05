import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categories"
import type { Activity } from "../types"
import { useActivity } from "../hooks/useActivity"

const initialState : Activity = {
   id: uuidv4(),
   category: 1,
   name: '',
   calories: 0
}

export default function Form() {

   const {state, dispatch} = useActivity()

   const [activity, setActivity] = useState<Activity>(initialState)

   useEffect(()=>{
      if(state.activeId){
         const selectActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0]
         setActivity(selectActivity)         
      }
   }, [state])

   const handleChange = ( e : React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
      const isNumberField = ['category', 'calories'].includes(e.target.id)
      setActivity({
         ...activity,
         [e.target.id]: isNumberField ? +e.target.value : e.target.value
      })     
   }
   
   const isValidActivity = () => {
      const { name, calories } = activity
      return name.trim() !== '' && calories > 0
   }

   const handleSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault()      
      dispatch({ type: 'save-activity', payload: {newActivity: activity} })
      setActivity({...initialState, id: uuidv4()})
   }

   return(
      <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
         <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categoría: </label>
            <select className="border border-slate-300 p-2 rounded-lg w-full bg-white" id="category" value={activity.category} onChange={handleChange}>
               {categories.map(categoria=>(
                  <option key={categoria.id} value={categoria.id}>{categoria.name}</option>
               ))}
            </select>
         </div>

         <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad: </label>
            <input id="name" type="text" className="border border-slate-300 p-2 rounded-lg" placeholder="Ej. Comida, Ejercicio, Pesas..." value={activity.name} onChange={handleChange}/>
         </div>

         <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calorias: </label>
            <input id="calories" type="number" className="border border-slate-300 p-2 rounded-lg" placeholder="Ej. 200, 300..." value={activity.calories} onChange={handleChange}/>
         </div>

         <input type="submit" className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10" value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'} disabled={!isValidActivity()}/>

      </form>
   )
}
