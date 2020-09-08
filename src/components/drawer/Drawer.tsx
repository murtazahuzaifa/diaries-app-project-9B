import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const useStyles = makeStyles({
    avatar: {
        margin: "0 10px",
    },
    listItem: {
        borderBottom: '1px solid black',
    },
    totalAmount: {
        margin: '30px 0px',
    },
    quantity: {
        marginLeft: "10px",
    }
});

type PropType = {
    children: React.ReactNode,
    isOpen: boolean,
    setOpen: (val:boolean)=> void,
    anchor: "bottom" | "left" | "right" | "top" | undefined
}

const Drawer: React.FC<PropType> = ({children, isOpen, setOpen, anchor}) => {

    const classes = useStyles();

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        if (open) { setOpen(true) }
        else { setOpen(false) }
    };

    return (
        <div >
            <SwipeableDrawer
                anchor={anchor}
                open={isOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {children}
            </SwipeableDrawer>
        </div>
    );
}

export default Drawer;