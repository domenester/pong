export type TReducers = {
  [key: string]: (setState: Function, payload: any) => void
}