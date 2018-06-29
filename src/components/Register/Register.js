/*
Don't require state then normal function 
onClick requires () => onRouteChange to don't activate when rendering, only when clicked  

Smart component to check state of email and password
State here is concerned about it and children only

PROPS this.props gets parent Information
*/
import React, { Component } from 'react';

class Register extends Component {

	constructor(props){
		super(props);
		this.state = {
			email: '', 
			password: '',
			name: ''
		}
	}
	onNameChange = (event) =>{
		this.setState({name: event.target.value})
	}
	onEmailChange = (event) =>{
		this.setState({email: event.target.value})
	}
	onPasswordChange = (event) =>{
		this.setState({password: event.target.value})
	}

	onSubmitSignIn = () => {
		console.log(this.state);
		fetch('https://whispering-gorge-80564.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name
			})
		})
		.then(response => response.json())
		.then(user => {
			if(user.id){
				this.props.loadUser(user); // required in App for all ComponentsS
				this.props.onRouteChange('home');
			}
		})
	}
	render(){
		return (
		<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f4 fw6 ph0 mh0 w-100">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
			        <input 
			        onChange={this.onNameChange}
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="text" name="name"  
			        id="name" />
			      </div>
	      		  <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input 
			        onChange={this.onEmailChange}
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="email" 
			        name="email-address"  
			        id="email-address" />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input
			        onChange={this.onPasswordChange}
			        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password" 
			        name="password"  
			        id="password" />
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
			      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      	type="submit" 
			      	value="Register" 
			      	onClick={this.onSubmitSignIn}/>
			    </div>
			  </div>
			</main>
		</article>
		); 
	}
}

export default Register;