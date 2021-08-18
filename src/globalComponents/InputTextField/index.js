import React from 'react';
import { makeStyles,Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
			background:"white",
			borderRadius:"5px"
    },
  },
}));

export default function BasicTextFields(props) {
  const classes = useStyles();
  const { id , label, variant, onChange , name , value} = props;

  return (
		<Box className={classes.root}>
			<TextField 
					id={id} 
					label={label} 
					variant={variant} 
					onChange={onChange}
					name={name}
					value={value}
			/>
		</Box>
  );
}