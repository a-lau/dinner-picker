
export function fetchList() {
  return {
    type: "FETCH_SLIST_FULFILLED",
      payload: [
	{ name: "Hamburgers", key: "Hamburgers", weight: 10, modDate: 1999, lastUsed: 2000},
	{ name: "Hamburger", key: "Hamburger", weight: 5, modDate: 1999, lastUsed: 2000}
      ]
  }
}
export function updateItem(item) {
  return {
    type: "UPDATE_ITEM",
      payload: [
	{ name: "Hamburgers", key: "Hamburgers", weight: 10, modDate: 1999, lastUsed: 2000},
	{ name: "Hot Dog", key: "Hot Dog", weight: 5, modDate: 1999, lastUsed: 2000}
      ]
  }
}
export function addItem(item) {
  return {
    type: "ADD_ITEM",
      payload: [
	{ name: "Hamburgers", key: "Hamburgers", weight: 10, modDate: 1999, lastUsed: 2000},
	{ name: "Hot Dog", key: "Hot Dog", weight: 5, modDate: 1999, lastUsed: 2000},
	{ name: "Ramen", key: "Ramen", weight: 6, modDate: 1999, lastUsed: 2000}
      ]
  }
}
export function delItem(item) {
  return {
    type: "DEL_ITEM",
      payload: [
	{ name: "Hamburgers", key: "Hamburgers", weight: 10, modDate: 1999, lastUsed: 2000},
	{ name: "Ramen", key: "Ramen", weight: 6, modDate: 1999, lastUsed: 2000}
      ] 
  }
}
