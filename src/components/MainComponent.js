import React, { Component } from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponents';
// import DishDetail from './DishDetails';
import { DISHES } from '../shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
	state = {
		dishes: DISHES
	};

	// onDishSelect(dishId) {
	// 	this.setState({
	// 		selectedDish: dishId,
	// 		openModal: true
	// 	});
	// }

	// closeModal() {
	// 	this.setState({
	// 		selectedDish: null,
	// 		openModal: false
	// 	});
	// }
	render() {
		const HomePage = () => {
			return <Home />;
		};
		return (
			<div className="App">
				<Header />
				<Switch>
					<Route path="/home" component={HomePage} />
					<Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
					<Redirect to="/home" />
				</Switch>

				{/* <DishDetail
					dish={this.state.dishes.filter(dish => dish.id === this.state.selectedDish)[0]}
					modal={this.state.openModal}
					closeModal={() => this.closeModal()}
				/> */}
				<Footer />
			</div>
		);
	}
}

export default Main;
