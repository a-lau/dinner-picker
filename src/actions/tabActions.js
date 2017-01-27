
export function setClickedTab(tab) {
		console.log("actions file " + tab)
  return {
    type: "SET_CLICKED_TAB",
	payload: tab,
  }
}

