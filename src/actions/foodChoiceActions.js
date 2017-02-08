
import FoodAPIs from '../services/FoodAPIs'

export function setDisplayedFood(item) {
  return {
    type: "SET_DISPLAYED_FOOD", payload: item
  }
}

export function setChosenFood() {
  return {
    type: "SET_CHOSEN_FOOD",
      payload: {
        key: "Hamburger",
        val: 123,
        date: 1234,
        time: 1233	
      }
  }
}
