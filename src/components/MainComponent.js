import React, { Component } from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponents';
import DishDetail from './DishDetails';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	postComment,
	fetchDishes,
	fetchComments,
	fetchPromos,
	fetchLeaders
} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
	return {
		dishes: state.dishes,
		comments: state.comments,
		promotions: state.promotions,
		leaders: state.leaders
	};
};

const mapDispatchToProps = dispatch => ({
	postComment: (dishId, rating, author, comment) =>
		dispatch(postComment(dishId, rating, author, comment)),
	fetchDishes: () => {
		dispatch(fetchDishes());
	},
	resetFeedbackForm: () => {
		dispatch(actions.reset('feedback'));
	},
	fetchComments: () => {
		dispatch(fetchComments());
	},
	fetchPromos: () => {
		dispatch(fetchPromos());
	},
	fetchLeaders: () => {
		dispatch(fetchLeaders());
	}
});

class Main extends Component {
	componentDidMount() {
		this.props.fetchDishes();
		this.props.fetchComments();
		this.props.fetchPromos();
		this.props.fetchLeaders();
	}

	render() {
		const HomePage = () => {
			return (
				<Home
					dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
					promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
					leader={this.props.leaders.leaders.filter(leader => leader.featured)[0]}
					dishesLoading={this.props.dishes.isLoading}
					dishesError={this.props.dishes.errorMessage}
					promosLoading={this.props.promotions.isLoading}
					promosError={this.props.promotions.errorMessage}
					leadersLoading={this.props.leaders.isLoading}
					leadersError={this.props.leaders.errorMessage}
				/>
			);
		};
		const DishWithId = ({ match }) => {
			return (
				<DishDetail
					dish={
						this.props.dishes.dishes.filter(dish => dish.id === parseInt(match.params.dishId))[0]
					}
					comments={this.props.comments.comments.filter(
						comment => comment.dishId === parseInt(match.params.dishId)
					)}
					postComment={this.props.postComment}
					isLoading={this.props.dishes.isLoading}
					errorMessage={this.props.dishes.errorMessage}
				/>
			);
		};
		return (
			<div className="App">
				<Header />
				<TransitionGroup>
					<CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
						<Switch>
							<Route path="/home" component={HomePage} />
							<Route
								exact
								path="/menu"
								component={() => (
									<Menu
										dishes={this.props.dishes.dishes}
										isLoading={this.props.dishes.isLoading}
										errorMessage={this.props.dishes.errorMessage}
									/>
								)}
							/>
							<Route path="/menu/:dishId" component={DishWithId} />
							<Route
								exact
								path="/contactus"
								component={() => <Contact resetForm={this.props.resetFeedbackForm} />}
							/>
							<Route
								exact
								path="/aboutus"
								component={() => <About leaders={this.props.leaders.leaders} />}
							/>
							<Redirect to="/home" />
						</Switch>
					</CSSTransition>
				</TransitionGroup>
				<Footer />
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
