const FoodList = {
  // foodList calls
  getList: function() {
    return fetch('/api/v1/list_food/', { 'method': 'get'})
      .then(response => response.json())
  },
  addFood: function(params) {
    return fetch('/api/v1/add_food/',
      { method:   'post',
         body:    JSON.stringify(params),
         headers: { 'Content-Type': 'application/json' } })
      .then(response => { 
        if (response.ok) {
          return response.json()
        } else {
          throw Error('Duplicate Entry')
        }
      })
  },
  editFood: function(params) {
    return fetch('/api/v1/edit_food/',
      { method:   'post',
         body:    JSON.stringify(params),
         headers: { 'Content-Type': 'application/json' } })
      .then(response => { 
        if (response.ok) {
          return response.json()
        } else {
          throw Error('Duplicate Entry')
        }
      })
  },
  updatePicked: function(params) {
    return fetch('/api/v1/update_picked/',
      { method:   'post',
        body:    JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          console.log("bad response")
        }
      })
  },
  delFood: function(params) {
    return fetch('/api/v1/del_food/', 
      { method:   'delete',
        body:     JSON.stringify(params),
        headers:  { 'Content-Type': 'application/json'  }})
      .then(response => response.json())
  },

  //eatenList calls
  getEaten: function() {
    return fetch('/api/v1/list_eaten/', { 'method': 'get'})
      .then(response => response.json())
  },
  addEaten: function(params) {
    return fetch('/api/v1/add_eaten/',
      { method:   'post',
        body:    JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          console.log("bad response")
          return null
        }
      })
  }
}

export default FoodList;
