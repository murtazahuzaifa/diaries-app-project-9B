import React, { FC, useEffect } from 'react';
import style from './App.module.css';
import Auth from '../pages/auth/Auth';
import UserHome from '../pages/userHome/UserHome';
import UserDiaries from '../pages/userHome/UserDiaries';
import DiaryEntries from '../pages/userHome/DiaryEntries';
import Home from '../pages/home/Home';
import { useAppDispatch } from '../store/store';
// import { useSelector } from 'react-redux';
import { checkWindowWidth } from './appSlice';
import { Routes, Route, Outlet } from 'react-router';

/////////////////////////////////////////////////// COMPONENT /////////////////////////////////////////////////////

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
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<div className={`${style.auth}`} ><Outlet /></div>}>
          <Route path=':action' element={<Auth />} />
        </Route>
        <Route path=':username' element={<UserHome />} >
          <Route path='/' element={<UserDiaries />} />
          <Route path='/diary' element={<div  ><Outlet /></div>}>
            <Route path=':diaryId' element={<DiaryEntries />} />
          </Route>
        </Route>
        <Route path='*' element={<div><h1>Page Not Found</h1></div>} />
      </Routes>
    </div>
  )
}

export default App;