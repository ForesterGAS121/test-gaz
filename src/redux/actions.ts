import {EnumAction, EventType} from "./reducer.typing";


export const addEvent = (payload: EventType) => ({type: EnumAction.addEvent, payload})
export const removeEvent = (payload: EventType) => ({type: EnumAction.removeEvent, payload})
export const updateEvent = (payload: EventType) => ({type: EnumAction.updateEvent, payload})