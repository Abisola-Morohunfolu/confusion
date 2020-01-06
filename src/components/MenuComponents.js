import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

function RenderMenuItem({ dish, click }) {
	return (
		<Card onClick={() => click(dish.id)}>
			<CardImg width="100%" src={dish.image} alt={dish.name} />
			<CardImgOverlay>
				<CardTitle>{dish.name}</CardTitle>
			</CardImgOverlay>
		</Card>
	);
}

const Menu = props => {
	const { dishes, click } = props;
	const menu = dishes.map(dish => {
		return (
			<div key={dish.id} className="col-12 col-md-5 m-1">
				<RenderMenuItem dish={dish} click={click} />
			</div>
		);
	});
	return (
		<div className="container">
			<div className="row">{menu}</div>
		</div>
	);
};

export default Menu;
