
const initialState = {
  fetching: false,
  fetched: false,
  selectionList: [],
}

const selectionlistReducer = (state=initialState, action) => {
  switch (action.type) {
    case "FETCH_SLIST_PENDING": {
      return {...state, fetching: true}
    }
    case "FETCH_SLIST_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_SLIST_FULFILLED": {
      return {
	...state,
	fetching: false,
	fetched: true,
	selectionList: action.payload
      }
    }
    default:
  }
  return state
}

export default selectionlistReducer;
