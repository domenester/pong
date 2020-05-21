interface IPanelReducer {
  hit: number
  lastHit: number
  higherHit: number
  player1Score: number
  player2Score: number
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
  },
  increasePlayer1Score: (state: any, payload: IPanelReducer) => {
    return {
      ...state,
      panel: {
        ...state.panel,
        player1Score: state.panel.player1Score + 1
      }
    }
  },
  increasePlayer2Score: (state: any, payload: IPanelReducer) => {
    return {
      ...state,
      panel: {
        ...state.panel,
        ...payload,
        player2Score: state.panel.player2Score + 1
      }
    }
  }
}
