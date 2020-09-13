import React, { FC, useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import style from './UserHome.module.css';
import { useSelector } from 'react-redux';
import { isLessThan1080 } from '../../app/appSlice';
import request from '../../services/request';
import { RootStateType } from '../../store/parentReducer';
import { updateDiaries } from './diarySlice';
import { useAppDispatch } from '../../store/store';
import { Diary } from '../../interfaces/diary.interface';
import { useNavigate } from "react-router-dom";
// import EntryInput from '../../components/entryInput/EntryInput';
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
    const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
    // console.log(username);
    useEffect(() => {
        if (!isAuthenticated) {
            navigate(`/auth/login`)
        }
        if (isAuthenticated && userId) {
            request.get<{}, { diaries: Diary[] }>(`/diaries/${userId}`)
                .then(data => { console.log(data); dispatch(updateDiaries(data.diaries)); })
                .catch(error => console.log(error))
            // request.get<{}, Diary[]>(`/diaries/enteries/${userId}`)
            // .then(data => { console.log(data); dispatch(updateDiaries(data)); })
            // .catch(error => console.log(error))
        }
        // fetchDataFromServerAndLog();
    }, [])

    return (
        <>
            <div className={`${style.userHome}`}>
                <div className={`${style.navBar}`}>
                    <div style={{ visibility: isLess1080 ? 'visible' : 'hidden' }} > </div>
                    <div><h1>Diary App</h1></div>
                    <div><Avatar aria-label="user-name" className={classes.avatar} > {userName ? userName[0].toUpperCase() : 'U'} </Avatar></div>
                </div>
                <div className={`${style.mainbody}`}>
                    <Outlet />
                </div>
            </div>
        </>
    )
};

export default UserHome;