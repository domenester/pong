interface ICounterDownReducer {
  value: number
}

export default {
  setCounterDown: (state: any, payload: ICounterDownReducer) => {
    return {
      ...state,
      counterDown: {
        ...state.counterDown,
        ...payload
      }
    }
  }
}
