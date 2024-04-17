export type ItemTypes = {
    id: string,
    text: string,
    completed: boolean,
    createdDate: number,
    completedDate: number
};

export type ReduxStateType = {
    isLoading: boolean,
    data: ItemTypes[],
    error:boolean
}