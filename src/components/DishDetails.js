import React, { Component } from 'react';
import {
	Card,
	CardImg,
	CardText,
	CardTitle,
	CardBody,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	Label,
	Row,
	Col
} from 'reactstrap';
import { LocalForm, Errors, Control } from 'react-redux-form';
import { Link } from 'react-router-dom';
import Loading from './LoadingComponent';

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class DishDetail extends Component {
	state = {
		isModalOpen: false
	};

	toggleModal = () => {
		const val = this.state.isModalOpen;
		this.setState({
			isModalOpen: !val
		});
	};

	handleSubmit = values => {
		console.log(`Current State is ${JSON.stringify(values)}`);
		alert(`Current State is ${JSON.stringify(values)}`);
	};

	render() {
		const { dish, comments, addComments, isLoading, errorMessage } = this.props;
		const singleComment = comments.map(comment => {
			return (
				<div key={comment.date}>
					<p>{comment.comment}</p>
					<p>
						-- {comment.author} ,
						{new Intl.DateTimeFormat('en-US', {
							year: 'numeric',
							month: 'short',
							day: '2-digit'
						}).format(new Date(Date.parse(comment.date)))}
					</p>
				</div>
			);
		});
		if (isLoading) {
			return (
				<div className="container">
					<div className="row text-center mt-2">
						<Loading />
					</div>
				</div>
			);
		} else if (errorMessage) {
			return (
				<div className="container">
					<div className="row">
						<h4>{errorMessage}</h4>
					</div>
				</div>
			);
		} else if (dish != null)
			return (
				<div className="container">
					<div className="row">
						<Breadcrumb>
							<BreadcrumbItem>
								<Link to="/home">Home</Link>
							</BreadcrumbItem>
							<BreadcrumbItem>
								<Link to="/menu">Menu</Link>
							</BreadcrumbItem>
							<BreadcrumbItem active>{dish.name}</BreadcrumbItem>
						</Breadcrumb>
						<div className="col-12">
							<h3>{dish.name}</h3>
							<hr />
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-md-5 m-1">
							<Card>
								<CardImg width="100%" src={dish.image} alt={dish.name} />
								<CardBody>
									<CardTitle>{dish.name}</CardTitle>
									<CardText>{dish.description}</CardText>
								</CardBody>
							</Card>
						</div>
						<div className="col-12 col-md-5 m-1 Comment">
							{singleComment}

							<Button color="outline" onClick={this.toggleModal}>
								<span className="fa fa-pencil fa-lg mr-1"></span>Submit Comment
							</Button>
						</div>
					</div>
					<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
						<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
						<ModalBody>
							<LocalForm
								onSubmit={values => {
									this.toggleModal();
									addComments(dish.id, values.rating, values.author, values.comment);
								}}
							>
								<Row className="form-group">
									<Label htmlFor="rating" md={2}>
										Ratings
									</Label>
									<Col md={12}>
										<Control.select model=".rating" name="rating" className="form-control">
											<option>1</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>
											<option>5</option>
										</Control.select>
									</Col>
								</Row>
								<Row className="form-group">
									<Label htmlFor="author" md={3}>
										Your Name
									</Label>
									<Col md={12}>
										<Control.text
											model=".author"
											name="author"
											id="author"
											placeholder="Your Name"
											className="form-control"
											validators={{
												required,
												minLength: minLength(3),
												maxLength: maxLength(15)
											}}
										/>
										<Errors
											className="text-danger"
											model=".author"
											show="touched"
											messages={{
												required: 'This field is required',
												minLength: 'Must be more than 2 characters',
												maxLength: 'Must be 15 characters or less'
											}}
										/>
									</Col>
								</Row>
								<Row className="form-group">
									<Label htmlFor="comment" md={3}>
										Comment
									</Label>
									<Col md={12}>
										<Control.textarea
											model=".comment"
											name="comment"
											id="comment"
											rows="6"
											inputMode="text"
											className="form-control"
											validators={{
												required,
												minLength: minLength(3)
											}}
										/>
										<Errors
											className="text-danger"
											model=".comment"
											show="touched"
											messages={{
												required: 'This field is required',
												minLength: 'Must be more than 2 characters'
											}}
										/>
									</Col>
								</Row>
								<Button type="submit" value="submit" color="primary">
									Submit
								</Button>
							</LocalForm>
						</ModalBody>
					</Modal>
				</div>
			);
	}
}

export default DishDetail;
