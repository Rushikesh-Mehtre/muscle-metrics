export interface exerciseObj{
    id:string,
    title:string
}
export interface myWorkoutObj {
    id:string
    exerciseName:string,
    exercises : exerciseObj[]
}