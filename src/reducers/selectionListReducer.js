
const initialState = {
  fetching: false,
  fetched: false,
  selectionList: [],
}

const selectionListReducer = (state=initialState, action) => {
		console.log("in slist reducer")
				console.log(state)
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
    case "UPDATE_ITEM": {
      return {
        ...state,
	selectionList: action.payload
      }
    }
    case "ADD_ITEM": {
      return {
        ...state,
	selectionList: action.payload
      }
    }
    case "DEL_ITEM": {
      return {
        ...state,
	selectionList: action.payload
      }
    }
    default:
  }
  return state
}

export default selectionListReducer;
