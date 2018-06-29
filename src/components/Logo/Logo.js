/*
Don't require state then normal function 

*/
import React from 'react';
import logo from './Logo.png';
import './Logo.css';

const Logo = () => {
	return (
		<div className='tl ma4 mt0'>
		<img alt='logo' id="mainLogo" src={logo} />
		</div>
	); 
}

export default Logo;