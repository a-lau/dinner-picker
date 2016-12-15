const FoodList = {
  getList: function() {
    return fetch('/api/v1/list_food/', { 'method': 'get'})
      .then(response => response.json())
  }
}

export default FoodList;
