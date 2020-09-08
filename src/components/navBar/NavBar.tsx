import React, {FC} from 'react';
import style from './NavBar.module.css';
import {ListRounded} from '@material-ui/icons'
import {Avatar, IconButton } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: 'green',
    },
  }),
);

const NavBar:FC = ()=>{
    const classes = useStyles();

    return(
        <div className={`${style.navBar}`}>
            <div ><IconButton><ListRounded fontSize="large" color='action' /></IconButton></div>
            <div><h1>Diary App</h1></div>
            <div><Avatar aria-label="user-name" className={classes.avatar} > R </Avatar></div>
        </div>
    )
};

export default NavBar;