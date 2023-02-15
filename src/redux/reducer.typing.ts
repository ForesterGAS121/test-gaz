export enum EnumAction {
    addEvent = 'add-event',
    removeEvent = 'remove-event',
    updateEvent = 'update-event',
}

export type EventType = {
    title: string,
    start: Date,
    end: Date,
    notification: Date,
    type: string
    id: number
}
export type StoreType = {
    events: Record<string, EventType[]>
}


export type ActionsEvent = {
    type: EnumAction
    payload: EventType
}
