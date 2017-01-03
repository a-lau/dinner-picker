const FoodList = {
  getList: function() {
    return fetch('/api/v1/list_food/', { 'method': 'get'})
      .then(response => response.json())
  },
  addFood: function(params) {
    return fetch('/api/v1/add_food/',
      { method:   'post',
         body:    JSON.stringify(params),
         headers: { 'Content-Type': 'application/json' } })
      .then(response => { if (response.ok) console.log(response) })
  },
  editFood: function(params) {
    return fetch('/api/v1/edit_food/',
      { method:   'post',
         body:    JSON.stringify(params),
         headers: { 'Content-Type': 'application/json' } })
      .then(response => response.json())
  },
  delFood: function(params) {
    return fetch('/api/v1/del_food/', 
      { method:   'delete',
        body:     JSON.stringify(params),
        headers:  { 'Content-Type': 'application/json'  }})
      .then(response => response.json())
  }
}

export default FoodList;
