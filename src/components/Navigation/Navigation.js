/*
Don't require state then normal function 
onClick requires () => onRouteChange to don't activate when rendering, only when clicked  
*/
import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
	if(isSignedIn){
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p className='f3 link dim black underline pa3 pointer'
					onClick={() => onRouteChange('signOut')}
					> Sign Out</p>
			</nav>
		);
	} else {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p className='f3 link dim black underline pa3 pointer'
					onClick={() => onRouteChange('signIn')}
					> Sign In</p>
				<p className='f3 link dim black underline pa3 pointer'
					onClick={() => onRouteChange('register')}
					> Register</p>
			</nav>
		);
	}
}

export default Navigation;