import React, { Component } from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponents';
import DishDetail from './DishDetails';
import About from './AboutComponent';
// import { DISHES } from '../shared/dishes';
// import { COMMENTS } from '../shared/comments';
// import { LEADERS } from '../shared/leaders';
// import { PROMOTIONS } from '../shared/promotions';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	return {
		dishes: state.dishes,
		comments: state.comments,
		promotions: state.promotions,
		leaders: state.leaders
	};
};

class Main extends Component {
	// state = {
	// 	dishes: DISHES,
	// 	comments: COMMENTS,
	// 	promotions: PROMOTIONS,
	// 	leaders: LEADERS
	// };

	render() {
		const HomePage = () => {
			return (
				<Home
					dish={this.props.dishes.filter(dish => dish.featured)[0]}
					promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
					leader={this.props.leaders.filter(leader => leader.featured)[0]}
				/>
			);
		};
		const DishWithId = ({ match }) => {
			return (
				<DishDetail
					dish={this.props.dishes.filter(dish => dish.id === parseInt(match.params.dishId))[0]}
					comments={this.props.comments.filter(
						comment => comment.dishId === parseInt(match.params.dishId)
					)}
				/>
			);
		};
		return (
			<div className="App">
				<Header />
				<Switch>
					<Route path="/home" component={HomePage} />
					<Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
					<Route path="/menu/:dishId" component={DishWithId} />
					<Route exact path="/contactus" component={Contact} />
					<Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
					<Redirect to="/home" />
				</Switch>

				{/* <DishDetail
					dish={this.props.dishes.filter(dish => dish.id === this.state.selectedDish)[0]}
					modal={this.state.openModal}
					closeModal={() => this.closeModal()}
				/> */}
				<Footer />
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps)(Main));
