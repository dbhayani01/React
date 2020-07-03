import React from 'react';
import { Component } from 'react';
import { Card, CardBody, CardText, CardTitle, CardImg, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, Label, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = val => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
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
        console.log(`Current State: ${JSON.stringify(values)}`);
        alert(`Current State: ${JSON.stringify(values)}`);
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
                                <Control.text id="name" model=".name" name="name" placeholder="Your Name" 
                                className="form-control" 
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                />
                            <Errors
                                className="text-danger"
                                show="touched"
                                model=".name"
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
                <Card>
                    <CardImg width="100%" src={image} alt={name} />
                    <CardBody>
                        <CardTitle><strong>{name}</strong></CardTitle>
                        <CardText>{description}</CardText>
                    </CardBody>
                </Card>
            );    
        }
        else{
            return(
                <div></div>
            );
        }
    }

function RenderComments({comments}) {
        if(comments!= null){
            const contents = comments.map((obj) =>{
                let {comment, author, date} = obj;
                date = convertDate(date);
                console.log(comment);
                return(
                    <div>
                        <p><li>{comment}</li></p>
                        <p><li>-- {author}, {date}</li></p>
                    </div>           
                );
            });
            console.log(contents);
            return (
                <div>
                    <h2><strong>Comments</strong></h2>
                    <ul className="list-unstyled">{contents}</ul>
                    <CommentForm />     
                </div>                   
            );

        } else{
            return(
                <div></div>
            );
        }
        
    }

const DishDetail = (props) => {
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
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
        )
    }

export default DishDetail;