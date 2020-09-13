import React, { FC } from 'react';
import style from './Home.module.css';
import { Button } from '@material-ui/core';
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import { ListRounded } from '@material-ui/icons'
import GreenButton from '../../components/buttons/GreenButton';
import { useSelector } from 'react-redux';
import { isLessThan420 } from '../../app/appSlice';
import { useNavigate } from "react-router-dom";

const Home: FC = () => {

    const isLess420 = useSelector(isLessThan420);
    const navigate = useNavigate();
  return (
        <div className={`${style.home}`} >
            <div className={`${style.navBar}`}>
                <div > </div>
                <div><h1>Diary App</h1></div>
                <div> 
                    <Button variant="outlined" size={isLess420? 'small':undefined } onClick={()=>{navigate(`/auth/login`)}}  >Login</Button>
                    <hr/>
                    <div><GreenButton size={isLess420? 'small':undefined } onClick={()=>{navigate(`/auth/signup`)}} >Sign Up</GreenButton></div>
                </div>
            </div>
            <div className={`${style.homeBody}`} >
                <div>
                    <h1 >Digitize Your Routine, Thoughts And Memories</h1>
                </div>
                <div > </div>
                <div><img src={require('../../images/mobileDiary.svg')} alt="bookspile"/></div>
            </div>
        </div>
    )
};

export default Home;