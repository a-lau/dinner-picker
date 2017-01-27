
const initialState= {
  tabClicked: "first"
}

const TabReducer = (state=initialState, action) => {
  switch (action.type) {
    case "SET_CLICKED_TAB": {
			console.log("actions file")
					console.log(action.payload)
      return {...state, tabClicked: action.payload}
    }
    default:
  }
  return state;
}

export default TabReducer;
