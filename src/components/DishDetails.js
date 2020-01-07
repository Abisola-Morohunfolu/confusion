import React from 'react';
import {
	Card,
	CardImg,
	CardText,
	CardTitle,
	CardBody,
	Breadcrumb,
	BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

const DishDetail = props => {
	const { dish, comments } = props;
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
				<div className="col-12 col-md-5 m-1 Comment">{singleComment}</div>
			</div>
		</div>
	);
};

export default DishDetail;
