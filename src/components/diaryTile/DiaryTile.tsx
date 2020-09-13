import React, { FC, useState } from 'react';
import { Diary } from '../../interfaces/diary.interface';
import { LockOutlined, LockOpenOutlined } from '@material-ui/icons'
import { BorderBtn, FilledBtn } from '../../components/buttons/AppButtons';
import style from './DiaryTile.module.css';
import EntryInput from '../../components/entryInput/EntryInput';
import {useNavigate} from 'react-router';
import {RootStateType} from '../../store/parentReducer';
import { useSelector } from 'react-redux';
import request from '../../services/request';
import {useAppDispatch} from '../../store/store';
import {addEntry} from '../../pages/userHome/entrySlice';
import {updateDiary} from '../../pages/userHome/diarySlice';
import {Entry} from '../../interfaces/entry.interface';
// import {} from '../../pages/auth/userSlice';

const DiaryTile: FC<Partial<Diary>> = ({ id, entryIds, title, updatedAt, createdAt, type }) => {
    const [isEntryOpen, setEntryOpen] = useState<boolean>(false);
    const userName = useSelector((state:RootStateType)=> state.user?.userName);
    const navigate = useNavigate();
    const handleViweAll = ()=>{ navigate(`/${userName}/diary/${id}`) }
    const noOfEntry = entryIds?.length || 0 ;
    const dispatch = useAppDispatch();


    const onEntrySave = (title:string, content:string,)=>{
        request.post<{title:string, content:string, diaryId:string}, {diary:Diary, entry:Entry}>(`/diaries/entries/${id}`,
        {title, content, diaryId:id})
        .then(({diary,entry})=> {
            dispatch(updateDiary(diary));
            dispatch(addEntry(entry));
        }).catch(error=> console.log(error));
    }

    return (
        <>
            <EntryInput visible={isEntryOpen} onCancel={() => { setEntryOpen(false) }} onSave={onEntrySave} />
            <div className={`${style.diaryTile}`} >
                <div><h1>{title}</h1></div>
                <div>{noOfEntry} {noOfEntry<2? "entry":"entries"} saved</div>
                <div><span>Created at:</span> {createdAt}</div>
                <div><span>Updated at:</span> {updatedAt}</div>
                <div className={`${style.lockIcon}`} > {type?.toLowerCase() == 'public' ? <LockOpenOutlined /> : <LockOutlined />}<span>{type}</span> </div>
                <div className={`${style.buttons}`} >
                    <div><FilledBtn onClick={() => { setEntryOpen(true) }} >add entry</FilledBtn></div>
                    <div><BorderBtn r_arrow={true} onClick={handleViweAll} >view all </BorderBtn></div>
                </div>
            </div>
        </>
    )
}

export default DiaryTile;

{/* <Avatar aria-label="user-name" className={classes.avatar} > R </Avatar> */ }