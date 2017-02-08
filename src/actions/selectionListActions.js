
import FoodAPIs from '../services/FoodAPIs'

export function fetchList() {
  return function(dispatch) {
    FoodAPIs.getList().then((response) => {
      dispatch({type: "FETCH_SLIST_FULFILLED", payload: response})
	})
	.catch((err) => {
	  dispatch({type: "FETCH_SLIST_REJECTED", payload: err})
	})
  }
}
export function updateItem(item) {
  return function(dispatch) {
    FoodAPIs.editFood(item).then((response) => {
	  console.log(response)
      dispatch({type: "UPDATE_ITEM", payload: response})
    })
    .catch((err) => {
      dispatch({type: "FETCH_SLIST_REJECTED", payload: err})
    })
  }
}
export function addItem(item) {
  return function(dispatch) {
	FoodAPIs.addFood(item).then((response) => {
	  console.log(response.error)
      dispatch({type: "ADD_ITEM", payload: response})
    })
    .catch((err) => {
      dispatch({type: "FETCH_SLIST_REJECTED", payload: err})
    })
  }
}
export function delItem(item) {
  return function(dispatch) {
	FoodAPIs.delFood(item).then((response) => {
		console.log(response)
      dispatch({type: "DEL_ITEM", payload: response})
    })
  }
}

export function clearError() {
  return {
    type: "CLEAR_ERROR",
	payload: false,
  }
}
