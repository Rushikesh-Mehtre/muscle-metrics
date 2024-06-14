export interface exerciseObj{
    id:string,
    title:string
}

export interface optionItem{
    id:string,
    title:string,
    description?:string,
    exercises?:exerciseObj[]
}
export interface DropdownProps {
    labelHeading?:string,
    options:optionItem[],
    optionSelectHandler : (selectedOption:string)=>void
}