import React from 'react'

import FoodList from './FoodList'
import data from './data.json'

export default class Manager extends React.Component {
    constructor(props) {
      super(props);
      this.clickAdd = this.clickAdd.bind(this);
      this.clickEdit = this.clickEdit.bind(this);
      this.clickDelete = this.clickDelete.bind(this);
      this.state = { foodData: data.foodList }
    }
    
    clickAdd(e) {
      e.preventDefault();
      console.log('The add button was clicked.');
      FoodList.addFood().then(json => {
        console.log(json);
      });
    }
    clickEdit(e) {
      e.preventDefault();
      console.log('The edit button was clicked.');
      FoodList.getList().then(json => {
	console.log(json);
      });
    }
    clickDelete(e) {
      e.preventDefault();
      console.log('The del button was clicked.');
      FoodList.delFood().then(json => {
        console.log(json);
      });
    }
    listItems() {
      return (
	<div className="ui middle aligned selection list">
        {this.state.foodData.map(function(item) {
          return( 
            <div className="item" key={item.name}>
              <div className="content">
	        <div className="header">{item.name}</div>
	      </div>
	    </div>
	  )
        })}
	</div>
      )
    }

    render() {
      return(
	<div>
  	  <div>
	    {this.listItems()}
	  </div>
	  <div className="ui floating labeled icon dropdown button">
	    <i className="plus icon"></i>
	    <span className="text">Add New Item</span>
	    <div className="menu">
	      <div className="header">Input New Item</div>
	      <div className="ui left icon input">
	      	<i className="plus icon"></i>
                <input type="text" name="meal-type" placeholder="Enter a meal option..."></input>
              </div> 
	      <div className="item">
                <button className="ui button" onClick={this.clickAdd}>Add</button>
	      </div>
            </div>
          </div>
          <button className="ui button" onClick={this.clickEdit}>Edit</button>
	  <button className="ui button" onClick={this.clickDelete}>Delete Item</button>
	 
<div class="ui floating labeled icon dropdown button">
  <i class="filter icon"></i>
    <span class="text">Filter</span>
      <div class="menu">
          <div class="header">
	        Search Issues
		    </div>
		        <div class="ui left icon input">
			      <i class="search icon"></i>
			            <input type="text" name="search" placeholder="Search...">
				        </div>
					    <div class="header">
					          <i class="tags icon"></i>
						        Filter by tag
							    </div>
							        <div class="divider"></div>
								    <div class="item">
								          <div class="ui red empty circular label"></div>
									        Important
										    </div>
										        <div class="item">
											      <div class="ui blue empty circular label"></div>
											            Announcement
												        </div>
													    <div class="item">
													          <div class="ui black empty circular label"></div>
														        Discussion
															    </div>
															      </div>
															      </div>



        </div>
      );
    }
}
