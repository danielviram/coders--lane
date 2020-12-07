import React from 'react';
import { Link } from "react-router-dom";
import AuthOptions from "./AuthOptions";

// import '../App.css';
import './style.css'
// import PersonIcon from '@material-ui/icons/Person';
// import IconButton from '@material-ui/core/IconButton';
// import ForumIcon from '@material-ui/icons/Forum';

export default function Header() {
	return (
		<div className="header">
		
			<img
				className="header-logo"
				src="https://perrit.eu/wp-content/uploads/2015/10/JOIN-logo.png"
				alt=""
				
			/>

			<header id="header">
			<Link to="/">
			  
			</Link>
			<AuthOptions />
		  </header>
		</div>
	);
}
