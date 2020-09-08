import React, {FC} from 'react';
import style from './App.module.css';
import Auth from '../page/auth/Auth';

const App:FC = ()=>{
  return(
    <div className={`${style.app}`} >
      <Auth/>
    </div>
  )
}

export default App;