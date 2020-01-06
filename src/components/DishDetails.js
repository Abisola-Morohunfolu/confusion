import React from 'react';
import { Card, CardImg, CardText, CardTitle, CardBody } from 'reactstrap';
import './DishDetail.css';

const DishDetail = props => {
	const { dish, modal, closeModal } = props;
	let singleComment;
	if (dish == null && modal === false) {
		return null;
	} else {
		singleComment = dish.comments.map(comment => {
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
	}

	return (
		<div className="Modal" onClick={closeModal}>
			<div className="container">
				<div className="row ModalContent">
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
					<span className="ModalButton" onClick={closeModal}>
						<p>&times;</p>
					</span>
				</div>
			</div>
		</div>
	);
};

export default DishDetail;
