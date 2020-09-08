import React, { FC, useState } from 'react';
// import { NavBar } from '../../components';
import GreenButton from '../../components/buttons/GreenButton';
// import GreenTextField from '../../components/TextFields/GreenTextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Avatar, IconButton } from '@material-ui/core';
import { ListRounded } from '@material-ui/icons'
import style from './UserHome.module.css';
import { useSelector } from 'react-redux';
import { isLessThan1080 } from '../../app/appSlice';
import { Drawer } from '../../components';

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

const UserHome: FC = () => {
    const classes = useStyles();
    const isLess1080 = useSelector(isLessThan1080);
    const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
    return (
        <div className={`${style.userHome}`}>
            <div className={`${style.navBar}`}>
                <div style={{visibility: isLess1080? 'visible':'hidden'}} >
                    <IconButton onClick={() => { setDrawerOpen(!isDrawerOpen) }} ><ListRounded fontSize="large" color='action' /></IconButton>
                </div>
                <div><h1>Diary App</h1></div>
                <div><Avatar aria-label="user-name" className={classes.avatar} > R </Avatar></div>
            </div>
            <Drawer isOpen={isDrawerOpen} setOpen={setDrawerOpen} anchor={'left'}  >
                <div className={`${style.leftPaneInDrawer}`} >
                    <GreenButton  >Create Diary</GreenButton>
                </div>
            </Drawer>
            <div className={`${style.mainPain}`}>
                <div className={`${style.leftPane}`} style={{ display: isLess1080 ? "none" : "" }} >
                    <GreenButton  >Create Diary</GreenButton>
                </div>
                <div className={`${style.rightPane}`} >
                    <input type="text" placeholder='Title' className={`${style.title}`} />
                    <hr className={`${style.seperator}`} />
                    <textarea className={`${style.content}`} placeholder='Content' name="content" id="content" />
                    <GreenButton color="primary" variant="contained" className={classes.margin} >Save</GreenButton>
                </div>
            </div>
        </div>
    )
};

export default UserHome;