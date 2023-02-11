import {Dayjs} from "dayjs";

export enum EnumAction {
    addEvent = 'add-event',
    removeEvent = 'remove-event',
    updateEvent = 'update-event'
}

export type EventType = {
    title: string,
    start: Dayjs,
    end: Dayjs,
    notification: Dayjs,
    type: string
}
export type StoreType = {
    events: Record<string, EventType[]>
}


export type ActionsAddEvent = {
    type: EnumAction
    payload: EventType
}
