
const initialState = {
      fetching: false,
      fetched: false,
      eatenList: [],
}

const eatenListReducer = (state=initialState, action) => {
  switch (action.type) {
    case "FETCH_ELIST_PENDING": {
      return {...state, fetching: true}
    }
    case "FETCH_ELIST_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_ELIST_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        eatenList: action.payload
      }
    }
    case "ADD_EATEN": {
      return {
        ...state,
        eatenList: action.payload
      }
    }
    default:
  }
  return state
}

export default eatenListReducer;
