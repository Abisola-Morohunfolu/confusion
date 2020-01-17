import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import Loading from './LoadingComponent';

function RenderCard({ item, isLoading, errorMessage }) {
	if (isLoading) {
		return <Loading />;
	} else if (errorMessage) {
		return (
			<Card>
				<h4>{errorMessage}</h4>
			</Card>
		);
	}
	return (
		<Card>
			<CardImg src={item.image} alt={item.name} />
			<CardBody>
				<CardTitle>{item.name}</CardTitle>
				{item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
				<CardText>{item.description}</CardText>
			</CardBody>
		</Card>
	);
}

function HomeComponent({ dish, promotion, leader, dishesLoading, dishesError }) {
	return (
		<div className="container">
			<div className="row align-items-start">
				<div className="col-12 col-md md-1">
					<RenderCard item={dish} isLoading={dishesLoading} errorMessage={dishesError} />
				</div>
				<div className="col-12 col-md md-1">
					<RenderCard item={promotion} />
				</div>
				<div className="col-12 col-md md-1">
					<RenderCard item={leader} />
				</div>
			</div>
		</div>
	);
}

export default HomeComponent;
