import React, { FC, useEffect } from 'react';
import style from './Auth.module.css';
import { LoginForm, SignUpForm } from '../../components';
// import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import { green } from '@material-ui/core/colors';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { authenticateUser } from './authSlice';
import { setUser } from './userSlice';
import { useAppDispatch } from '../../store/store'; 
import request from '../../services/request';
import { User } from '../../interfaces/user.interface';
import {AuthResponse} from '../../services/mirage/routes/user';
import { useSelector } from 'react-redux';
import {RootStateType} from '../../store/parentReducer';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'div'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
}));

/////////////////////////////////////////////////// COMPONENT /////////////////////////////////////////////////////

const Auth: FC = () => {

    const classes = useStyles();
    const authUrlId = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isAuthenticated = useSelector((state:RootStateType)=>state.auth.isAuthenticated)
    const userName = useSelector((state:RootStateType)=>state.user?.userName)
////////////////////////////////////////////////////////////////////////////////////////////////////////
    const login = ({ userName, password }: { userName: string, password: string }) => {
        request.post<User, AuthResponse>('/auth/login', { userName, password },)
            .then(data => { 
            // console.log(data.user); 
            dispatch(authenticateUser(data.token));
            dispatch(setUser(data.user));
        })
            .catch(error => console.log(error))
    }

    const signup = ({ userName, password, email }: { userName: string, password: string, email?: string }) => {
        request.post<User, AuthResponse>('/auth/signup', { userName, password, email },)
            .then(data => {
                dispatch(authenticateUser(data.token));
                dispatch(setUser(data.user));
            })
            .catch(error => console.log(error))
    }
/////////////////////////////////////////////////////////////
    const callBack = ()=>{
        if (isAuthenticated && userName){
            navigate(`/${userName}`);
        }
    }
    useEffect(callBack, [userName])
/////////////////////////////////////////////////////////////
    let tabNo: 0 | 1 = 0;
    if (authUrlId.action.toLocaleLowerCase() === 'login') {
        tabNo = 0;
    } else if (authUrlId.action.toLocaleLowerCase() === 'signup') {
        tabNo = 1
    }
    const [value, setValue] = React.useState<number>(tabNo);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
///////////////////////////////////////////////////////////////
    const GreenTabs = withStyles((theme: Theme) => ({
        root: {
            color: 'green',
            borderBottom: '1px solid green',
        },
        indicator: {
            backgroundColor: 'green',
        },
    }))(Tabs);
    const GreenTab = withStyles(() => ({
        root: {
            // color: 'green',
            '&$selected': {
                color: 'green',
            },
        },
        selected: {},
    }))(Tab);
////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className={`${style.auth}`}>
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <GreenTabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <GreenTab disableRipple label="Login" onClick={() => { navigate(`/auth/login`) }} {...a11yProps(0)} />
                        <GreenTab disableRipple label="Sign Up" onClick={() => { navigate(`/auth/signup`) }} {...a11yProps(1)} />
                    </GreenTabs>
                </AppBar>
                <TabPanel value={value} index={0} >
                    <LoginForm setCridentails={login} />
                </TabPanel>
                <TabPanel value={value} index={1} >
                    <SignUpForm setCridentails={signup} />
                </TabPanel>
            </div>
        </div>
    )
}

export default Auth;