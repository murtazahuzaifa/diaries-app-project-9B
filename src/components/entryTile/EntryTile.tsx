import React, { FC } from 'react';
import { Entry } from '../../interfaces/entry.interface';
import style from './EntryTile.module.css';
import {Merge} from '../../utils';
// import { LockOutlined, LockOpenOutlined } from '@material-ui/icons'
// import { BorderBtn, FilledBtn } from '../../components/buttons/AppButtons';
type EventTypes = {
    onClick?:()=>void, 
}
type PropType = Merge<Entry, EventTypes>

const EntryTile: FC<Partial<PropType>> = ({ title, content, createdAt, updatedAt, onClick}) => {
    return (
        <div className={`${style.entryTile}`} title='view entry' >
            <div><h2>{title}</h2></div>
            <div><span>Created at:</span> {createdAt}</div>
            <div><span>Updated at:</span> {updatedAt}</div>
            <div><p>{content}</p></div>
        </div>
    )
}

export default EntryTile;
