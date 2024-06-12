export interface exerciseCountObj {
    setNo: number,
    repCount: number
}
export interface AccordionItem {
    title: string,
    id: string,
    exerciseCount: exerciseCountObj[]

}
export interface AccordionProps {
    items: AccordionItem[],
    handleCurrentSet: (index: number, currentSet: number, repCount: number) => void,
    repCountHandler: (index: number, currentSet: number, repCount: string) => void

}
export interface AccordionItemProps {
    index: number,
    isActive: boolean,
    title: string,
    currentSet: number,
    onClick: (index: number) => void,
    exerciseCount: exerciseCountObj[],
    handleCurrentSet: (index: number, currentSet: number, repCount: number) => void,
    repCountHandler: (index: number, currentSet: number, repCount: string) => void
}

