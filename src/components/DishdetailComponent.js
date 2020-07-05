import React from 'react';
import { Component } from 'react';
import { Card, CardBody, CardText, CardTitle, CardImg, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, Label, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = val => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        
    };
    
    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleOnSubmit = values => {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }


    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm className="mx-3" onSubmit={values => this.handleOnSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select id="rating" model=".rating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name">Your Name</Label>
                                <Control.text id="author" model=".author" name="author" placeholder="Your Name" 
                                className="form-control" 
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                />
                            <Errors
                                className="text-danger"
                                show="touched"
                                model=".author"
                                messages={{
                                    required: "Required",
                                    minLength: "Must be greater than 2 characters",
                                    maxLength: "Must be 15 characters or less"
                                }}
                            ></Errors>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea id="comment" model=".comment" name="comment" rows="6" className="form-control" />
                            </Row>
                            <Row className="form-group">
                                <Button type="submit" color="primary">Submit</Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}




    
function convertDate(date) {
        date = new Date(date);
        var options = {year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString("en-US", options);
    }

function RenderDish({dish}) {
        if(dish!=null) {
            const {name, image, description} = dish;
            return(
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
            );    
        }
        else{
            return(
                <div></div>
            );
        }
    }

    function RenderComments({comments, postComment, dishId}) {
        if(comments!= null){
            const contents = comments.map((obj) =>{
                let {comment, author, date} = obj;
                date = convertDate(date);
                console.log(comment);
                return(
                    <Stagger in>
                    <Fade>
                    <div>
                        <p><li>{comment}</li></p>
                        <p><li>-- {author}, {date}</li></p>
                    </div> 
                    </Fade>  
                    </Stagger>        
                );
            });
            console.log(contents);
            return (
                <div>
                    <h2><strong>Comments</strong></h2>
                    <ul className="list-unstyled">{contents}</ul>
                    <CommentForm dishId={dishId} postComment={postComment} />
                </div>                   
            );

        } else{
            return(
                <div></div>
            );
        }
        
    }

const DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) 
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                    <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                          postComment={props.postComment}
                          dishId={props.dish.id} />
                    </div>
                </div>
            </div>
        )
    }

export default DishDetail;