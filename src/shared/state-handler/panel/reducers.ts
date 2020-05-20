interface IPanelReducer {
  score: number
  lastScore: number
  higherScore: number
}

export default {
  setPanel: (state: any, payload: IPanelReducer) => {
    return {
      ...state,
      panel: {
        ...state.panel,
        ...payload
      }
    }
  }
}
