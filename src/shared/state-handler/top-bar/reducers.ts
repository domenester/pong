interface ITopBabrReducer {
  height: number
}

export default {
  setTopBar: (state: any, payload: ITopBabrReducer) => {
    return {
      ...state,
      topBar: {
        ...state.topBar,
        ...payload
      }
    }
  }
}
