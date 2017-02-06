
export function fetchList() {
  return {
    type: "FETCH_ELIST_FULFILLED",
      payload: [
        { name: "Hamburgers", key: 1, dateUsed: 3},
        { name: "Hot Dogs", key: 2, dateUsed: 5},
	{ name: "Ramen", key: 3, dateUsed: 7}
    ]
  }
}

export function addItem(item) {
  return {
    type: "ADD_ITEM",
      payload: [
        { name: "Hamburgers", key: 1, dateUsed: 3},
        { name: "Hot Dogs", key: 2, dateUsed: 32},
	{ name: "Ramen", key: 3, dateUsed: 33},
        { name: "Hamburgers", key: 4, dateUsed: 35}
      ]
  }
}
