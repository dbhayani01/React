import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';

class DishDetail extends Component {
    renderDish(dish) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name} />
                    <CardBody>
                        <CardTitle>{this.props.dish.name}</CardTitle>
                        <CardText>{this.props.dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    renderComment(comments) {
        const commentList = comments.map((comment) => {
            return (
                <li key={comment.id} className="list-unstyled m-3">
                    <div>{comment.comment}</div>
                    <div>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</div>
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
    render() {
        if (this.props.dish) {
            const dish = this.props.dish;
            const dishdetail = this.renderDish(dish);
            const dishcomments = this.renderComment(dish.comments);
            return (
                <div className="container">
                    <div className="row">
                        {dishdetail}
                        {dishcomments}
                    </div>
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }
}

export default DishDetail;