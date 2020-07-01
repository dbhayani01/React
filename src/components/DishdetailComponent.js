import React from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';


   function RenderDish({dish}) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    function RenderComment({comments}) {
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
    const DishDetail=(props) => {
        if (props.dish) {
            const dish = props.dish;
            const dishdetail = <RenderDish dish={dish}/>
            const dishcomments = <RenderComment comments={dish.comments} />
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


export default DishDetail;