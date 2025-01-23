import { Activity } from "../types"

export type ActivityAction = 
    { type: 'save-activity', payload: { newActivity : Activity } } |
    { type: 'set-activeId', payload: { id : Activity['id'] } }

export type ActivityState = {
    activities : Activity[],
    activeId: Activity['id']
}

export const initialState : ActivityState = {
    activities: [],
    activeId: ''
}

export const activityReducer = ( state : ActivityState = initialState, action : ActivityAction ) => {
    if(action.type === 'save-activity'){
        let updatedActivities : Activity[] = []
        updatedActivities = state.activeId 
            ? updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)
            : updatedActivities = [...state.activities, action.payload.newActivity]
        
        return{
            ...state,
            activities: updatedActivities,
            activeId: ''
        }
    }

    if(action.type === 'set-activeId'){
        return{
            ...state,
            activeId: action.payload.id
        }
    }
    return state
}