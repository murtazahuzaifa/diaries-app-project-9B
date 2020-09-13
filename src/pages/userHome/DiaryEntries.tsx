import React, { FC, useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useSelector } from 'react-redux';
import { RootStateType } from '../../store/parentReducer';
import EntryTile from '../../components/entryTile/EntryTile';
import { useAppDispatch } from '../../store/store';
import { updateEnteries, addEntry } from './entrySlice';
import { updateDiary } from './diarySlice';
import { Diary } from '../../interfaces/diary.interface';
import { Entry } from '../../interfaces/entry.interface';
import request from '../../services/request';
import style from './UserHome.module.css';
import { Link } from 'react-router-dom';
// import DiaryTile from '../../components/diaryTile/DiaryTile';
import EntryInput from '../../components/entryInput/EntryInput';

const DiaryEntries: FC = () => {
    const entryList = useSelector((state: RootStateType) => state.entries.entryList);
    const userName = useSelector((state: RootStateType) => state.user?.userName);
    const [isEntryOpen, setEntryOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { diaryId } = useParams();

    const onEntrySave = (title:string, content:string,)=>{
        request.post<{title:string, content:string, diaryId:string}, {diary:Diary, entry:Entry}>(`/diaries/entries/${diaryId}`,
        {title, content, diaryId})
        .then(({diary,entry})=> {
            dispatch(updateDiary(diary));
            dispatch(addEntry(entry));
        }).catch(error=> console.log(error));
    }

    useEffect(() => {
        request.get<{}, { entries: Entry[] }>(`/diaries/entries/${diaryId}`)
            .then(data => { dispatch(updateEnteries(data.entries)) })
            .catch(error => { console.log(error) });
    }, [])

    return (
        <>
            <EntryInput visible={isEntryOpen} onCancel={() => { setEntryOpen(false) }} onSave={onEntrySave} />
            <div className={`${style.diaryEntryContainer}`} >
                <div><h1><Link to={`/${userName}`}>⮜ Diaries</Link> \ Entries</h1></div>
                <div ><button title='add entry' onClick={() => { setEntryOpen(true) }} className={`${style.addBtn}`} >+</button></div>
                {
                    entryList.map(({ title, content, updatedAt, createdAt }, idx) => (
                        <EntryTile
                            key={idx}
                            title={title}
                            content={content}
                            updatedAt={updatedAt}
                            createdAt={createdAt}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default DiaryEntries;

// {/* <EntryTile
//     key={idx}
//     title={"My first Code"}
//     content={'hello this is my first for arduino uno R3 in a bootcamp of robotics hello this is my first for arduino uno R3 in a bootcamp of robotics hello this is my first for arduino uno R3 in a bootcamp of robotics'}
//     updatedAt='4:00pm'
//     createdAt='5:00am'
// /> */}