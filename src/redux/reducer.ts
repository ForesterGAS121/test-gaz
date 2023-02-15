import {ActionsEvent, EnumAction, StoreType} from "./reducer.typing";
import dayjs from "dayjs";


const initialStore: StoreType = {
    events: {}
}
const reducer = (store = initialStore, action: ActionsEvent) => {

    switch (action.type) {
        case EnumAction.addEvent: {
            const date = dayjs(action.payload.start).format('YYYY-MM-DD')
            return {...store, events: {...store.events, [date]: [...(store.events[date] || []), action.payload]}}

        }
        case EnumAction.removeEvent: {
            const date = dayjs(action.payload.start).format('YYYY-MM-DD')
            const newArray = store.events[date].filter((el) => el.id !== action.payload.id)
            return {...store, events: {...store.events, [date]: [...newArray]}}
        }
        case EnumAction.updateEvent: {
            const date = dayjs(action.payload.start).format('YYYY-MM-DD')
            const newArray = store.events[date]
            newArray.splice(newArray.indexOf(action.payload), 1, action.payload)
            return {...store, events: {...store.events, [date]: [...newArray]}}
        }
        default:
            return store
    }
}
export default reducer