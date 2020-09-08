import React, { FC } from 'react';
import style from './Auth.module.css';
import { LoginForm, SignUpForm } from '../../components';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { green } from '@material-ui/core/colors';

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
        // margin: '50px 5%',
        backgroundColor: theme.palette.background.paper,
        // maxWidth: '80%',
    },
}));

const Auth: FC = () => {

    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    const GreenTabs = withStyles((theme: Theme) => ({
        root: {
            color: 'green',
            borderBottom: '1px solid green',
        },
        indicator: {
            backgroundColor: 'green',
        },
    }))(Tabs);
    const GreenTab = withStyles((theme: Theme) => ({
        root: {
            // color: 'green',
            '&$selected': {
                color: 'green',
              },
          },
          selected: {},
    }))(Tab);

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
                        <GreenTab disableRipple label="Login" {...a11yProps(0)} />
                        <GreenTab disableRipple label="Sign Up" {...a11yProps(1)} />
                    </GreenTabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <LoginForm />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <SignUpForm />
                    </TabPanel>
                </SwipeableViews>
            </div>
        </div>
    )
}

export default Auth;