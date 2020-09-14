import React, { FC, ReactNode } from 'react';
import style from './AppButtons.module.css';

type BorderBtn={children:ReactNode, title?:string, color?:string, bd?:string, r_arrow?:boolean, onClick?:()=>void}
export const BorderBtn: FC<BorderBtn> = ({children, color='green', bd='green', r_arrow=false, onClick, title })=>{
    return(
        <button title={title}  className={`${style.borderBtn}`} style={{color:color, border:`2px solid ${bd}`}} onClick={onClick} >
            {children} {!r_arrow || <span className={`${style.arrowRight}`}>➔</span>}
        </button>
    )
}
type FilledBtn={children:ReactNode, title?:string, color?:string, onClick?:()=>void}
export const FilledBtn: FC<FilledBtn> = ({children, color='white', onClick, title})=>{
    return(
        <button title={title} className={`${style.filledBtn}`} style={{color:color}} onClick={onClick} >
            {children}
        </button>
    )
}