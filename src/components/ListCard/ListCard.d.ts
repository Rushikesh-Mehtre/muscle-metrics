export interface listItem {
    title: string,
    id: number
}
export interface ListCardProps {
    cardHeading: string,
    cardList: listItem[]
    addToListHandler?: () => void;
    removeFromListHandler?: () => void;
    updatedList?:listItem[]
    editable:boolean,
    deleteWorkout?:any
}