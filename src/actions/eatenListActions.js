
import FoodAPIs from '../services/FoodAPIs'

export function fetchList() {
  return function(dispatch) {
    FoodAPIs.getEaten().then((response) => {
      dispatch({type: "FETCH_ELIST_FULFILLED", payload: response.reverse()})
	})
	.catch((err) => {
      dispatch({type: "FETCH_ELIST_REJECTED", payload: err})
	})
  }
}

export function addItem(item) {
  return function(dispatch) {
    FoodAPIs.addEaten(item).then((response) => {
      dispatch({type: "ADD_EATEN", payload: response.reverse()})
    })
  }
}
