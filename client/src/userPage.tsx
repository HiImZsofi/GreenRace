import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import './userPage.css';
import { Avatar, Container, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
		  light: '#6fbf73',
		  main: '#4caf50',
		  dark: '#357a38',
		  contrastText: '#fff',
		},
		secondary: {
		  light: '#33eb91',
		  main: '#00e676',
		  dark: '#00a152',
		  contrastText: '#000',
		},
	  },
});

class UserPage extends React.Component<{}, any> {
	render(): React.ReactNode {
		return (
			<>
			 <ThemeProvider theme={theme}>
			  <AppBar position="static">
			   <Container maxWidth="xl">
			    <Toolbar disableGutters>
				 <Avatar alt="Remy Sharp" src="/greenRaceLogo.png" variant="rounded" sx={{ width: 90, height: 90, display: { xs: 'none', md: 'flex' }}} />
				 
			    </Toolbar>
			   </Container>
			  </AppBar>
			 </ThemeProvider>
			</>
		)
	}
}
export default UserPage;