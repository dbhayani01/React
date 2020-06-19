import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';

class DishDetail extends Component {
   
    renderDish(dish) {
        if (dish != null) {
            return (
                <Card className="col-12 col-md-5 m-1" style={{ padding: 0 }}>
                    <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name} />
                    <CardBody>
                        <CardTitle>{this.props.dish.name}</CardTitle>
                        <CardText>{this.props.dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else {
            return (
                     <div></div>
                   );
        }
    }
    renderComment(comments) {
        if (comments != null) {
            const commentList = comments.map((comment) => {
                return (
                    <li key={comment.id} className="list-unstyled m-3">
                        <div>{comment.comment}</div>
                        <div>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</div>
                    </li>
                   
                     );
            })
           
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="col-12 col-md m-1">
                      {commentList}
                    </ul>
                </div>
            );
        }
        else {
            return (<div></div>);
        }

    }
    render() {  
        if (this.props.dish) {
            const dish = this.props.dish;
            const dishdetail = this.renderDish(dish);
            const dishcomments = this.renderComment(dish.comments);
            return (
                <div className="row col-12">
                    {dishdetail}
                    {dishcomments}
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }
    
    
}

export default DishDetail;