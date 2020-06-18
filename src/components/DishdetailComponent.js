import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';

class DishDetail extends Component {
    constructor(props)
    {
        super(props);
    }
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
                        <div>-- {comment.author} {comment.date}</div>
                    </li>
                );
            })
           console.log(comments);
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
        return (
            <div className="row">
                {this.renderDish(this.props.dish)}
                {this.renderComment(this.props.comments)}
            </div>

        );
    }
}

export default DishDetail;