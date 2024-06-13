export interface listItem {
    title: string,
    id: string
}
export interface ListCardProps {
    cardHeading: string,
    cardList: listItem[]
    addToListHandler?: (listItem:listItem) => void;
    removeFromListHandler?: (listItem:listItem) => void;
    updatedList?:listItem[]
    editable:boolean,
    deleteWorkout:()=>void
    canBeDeleted?:boolean,
    myWorkOutExercises?:any
}