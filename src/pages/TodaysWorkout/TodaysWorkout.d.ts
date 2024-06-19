export interface exerciseObj{
    id:string,
    title:string
}
export interface myWorkoutObj {
    id:string
    exerciseName:string,
    exercises : exerciseObj[]
}
export interface Entry {
    setNo: number;
    repCount: number;
    weight: number;
  }