import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

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
		<FadeTransform
			in
			transformProps={{
				exitTransform: 'scale(0.5) translateY(-50%)'
			}}
		>
			<Card>
				<CardImg src={baseUrl + item.image} alt={item.name} />
				<CardBody>
					<CardTitle>{item.name}</CardTitle>
					{item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
					<CardText>{item.description}</CardText>
				</CardBody>
			</Card>
		</FadeTransform>
	);
}

function HomeComponent({
	dish,
	promotion,
	leader,
	dishesLoading,
	dishesError,
	promosLoading,
	promosError,
	leadersLoading,
	leadersError
}) {
	return (
		<div className="container">
			<div className="row align-items-start">
				<div className="col-12 col-md md-1">
					<RenderCard item={dish} isLoading={dishesLoading} errorMessage={dishesError} />
				</div>
				<div className="col-12 col-md md-1">
					<RenderCard item={promotion} isLoading={promosLoading} errorMessage={promosError} />
				</div>
				<div className="col-12 col-md md-1">
					<RenderCard item={leader} isLoading={leadersLoading} errorMessage={leadersError} />
				</div>
			</div>
		</div>
	);
}

export default HomeComponent;
