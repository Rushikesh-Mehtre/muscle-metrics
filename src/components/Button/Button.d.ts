export interface ButtonProps {
    buttonTitle:string,
    onClick?:()=>void,
    disabled?:boolean,
    size?="small" | "medium" | "large"
}