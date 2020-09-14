import React, { FC, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Avatar, Menu, MenuItem, IconButton } from '@material-ui/core';
import style from './UserHome.module.css';
import { useSelector } from 'react-redux';
import { isLessThan1080 } from '../../app/appSlice';
import request from '../../services/request';
import { RootStateType } from '../../store/parentReducer';
import { updateDiaries } from './diarySlice';
import {unSetUser} from '../auth/userSlice';
import {unAuthenticateUser} from '../auth/authSlice';
import { useAppDispatch } from '../../store/store';
import { Diary } from '../../interfaces/diary.interface';
import { useNavigate } from "react-router-dom";
// import {fetchDataFromServerAndLog} from '../../utils';
// import UserDiaries from './UserDiaries';
// import UserDiaries from './UserDiaries';
// import DiaryEntries from './DiaryEntries';
import { Outlet } from 'react-router';
// import { useParams } from "react-router";
// import { Routes, Route } from 'react-router';
// import { Na } from "react-router-dom";
// import { NavBar } from '../../components';
// import GreenTextField from '../../components/TextFields/GreenTextField';
// import DiaryTile from '../../components/diaryTile/DiaryTile';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
        avatar: {
            backgroundColor: 'green',
        },
    },
    ));

/////////////////////////////////////////////////// COMPONENT /////////////////////////////////////////////////////
const UserHome: FC = () => {
    const classes = useStyles();
    const isLess1080 = useSelector(isLessThan1080);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state: RootStateType) => state.user?.id);
    const userName = useSelector((state: RootStateType) => state.user?.userName);
    const isAuthenticated = useSelector((state: RootStateType) => state.auth.isAuthenticated);
    // const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
    // console.log(username);
    const logout = ()=>{
        dispatch(unSetUser())
        dispatch(unAuthenticateUser())
    }

    const callBack = () => {
        if (!isAuthenticated) {
            navigate(`/`)
        }
        if (isAuthenticated && userId) {
            request.get<{}, { diaries: Diary[] }>(`/diaries/${userId}`)
                .then(data => { dispatch(updateDiaries(data.diaries)); })
                .catch(error => console.log(error))
        }
        // fetchDataFromServerAndLog();
    }
    useEffect(callBack, [isAuthenticated, userId])

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    );

    return (
        <>
            <div className={`${style.userHome}`}>
                <div className={`${style.navBar}`}>
                    <div style={{ visibility: isLess1080 ? 'visible' : 'hidden' }} > </div>
                    <div><h1>Diary App</h1></div>
                    <div><IconButton onClick={handleClick} ><Avatar aria-label="user-name" className={classes.avatar} > {userName ? userName[0].toUpperCase() : 'U'} </Avatar></IconButton></div>
                </div>
                <div className={`${style.mainbody}`}>
                    <Outlet />
                </div>
            </div>
            {renderMenu}
        </>
    )
};

export default UserHome;