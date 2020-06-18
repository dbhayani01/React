import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import DishDetail from './DishdetailComponent';


class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDish: null
    }
    console.log('Menu Component Constructor is being invoked');
  }
 
  componentDidMount(){
    console.log('Menu Component componentDidMount is being invoked');
  }
   
  onDishSelect(dish) {
    this.setState({ selectedDish: dish});
  }
  render() {
    const menu = this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
          <Card onClick={() => this.onDishSelect(dish)}>
            <CardImg width="100%" object src={dish.image} alt={dish.name} />
            <CardImgOverlay>
              <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });
    console.log('Menu Component render is being invoked');
    return (
      <div className="container">
        <div className="row">
          {menu}
        </div>
        {this.state.selectedDish == null ? <div></div> : <DishDetail dish={this.state.selectedDish} comments={this.state.selectedDish.comments} />}
      </div>
    );
  }
}

export default Menu;