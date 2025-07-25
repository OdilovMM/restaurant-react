import { Box, Container, Stack } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

export function Footer() {
	return (
		<div className='footer_config'>
			<Container>
				<Stack className={'main_footer_container'}>
					<Box className='copyrights'>
						Copyright Restaurant 2022, All right reserved.
					</Box>
				</Stack>
			</Container>
		</div>
	);
}
