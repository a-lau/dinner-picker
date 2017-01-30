
const initialState= {
  tabClicked: "first"
}

const TabReducer = (state=initialState, action) => {
  switch (action.type) {
    case "SET_CLICKED_TAB": {
      return {...state, tabClicked: action.payload}
    }
    default:
  }
  return state;
}

export default TabReducer;
