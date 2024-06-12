export interface ButtonProps {
    buttonTitle:string |undefined,
    onClick?:()=>void,
    disabled?:boolean,
    size?="small" | "medium" | "large"
}