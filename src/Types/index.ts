export type ItemTypes = {
    id: string,
    text: string,
    completed: boolean,
    createdDate: number
};

export type ReduxStateType = {
    loading: boolean,
    data: ItemTypes[]
}