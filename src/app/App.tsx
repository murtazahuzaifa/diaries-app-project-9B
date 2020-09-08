import React, { FC, useEffect } from 'react';
import style from './App.module.css';
import Auth from '../pages/auth/Auth';
import UserHome from '../pages/userHome/UserHome';
import Home from '../pages/home/Home';
import { useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import { checkWindowWidth } from './appSlice';

const App: FC = () => {

  const dispatch = useAppDispatch()

  const checkWindowWidthCallBack = () => {
    window.addEventListener('resize', () => {
      dispatch(checkWindowWidth())
    })
  }
  useEffect(checkWindowWidthCallBack, [])

  return (
    <div className={`${style.app}`} >
      <UserHome />
    </div>
  )
}

export default App;