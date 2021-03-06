
const initialState = {
  displayedFood: {},
  chosenFood: {}
}

const foodChoiceReducer = (state=initialState, action) => {
  switch (action.type) {
    case "SET_DISPLAYED_FOOD": {
      return {...state, displayedFood: action.payload}
    }
    case "SET_CHOSEN_FOOD": {
      return {...state, chosenFood: action.payload}
    }
    default:
  }
  return state
}

export default foodChoiceReducer;
