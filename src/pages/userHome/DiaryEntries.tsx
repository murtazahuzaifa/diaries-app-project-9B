import React, { FC, useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useSelector } from 'react-redux';
import { RootStateType } from '../../store/parentReducer';
import EntryTile from '../../components/entryTile/EntryTile';
import { useAppDispatch } from '../../store/store';
import { updateEntries, addEntry } from './entrySlice';
import { updateDiary } from './diarySlice';
import { Diary } from '../../interfaces/diary.interface';
import { Entry } from '../../interfaces/entry.interface';
import request from '../../services/request';
import style from './UserHome.module.css';
import { Link } from 'react-router-dom';
import EntryInput from '../../components/entryInput/EntryInput';
// import Swal from 'sweetalert2';
// import DiaryTile from '../../components/diaryTile/DiaryTile';

const DiaryEntries: FC = () => {
    const entryList = useSelector((state: RootStateType) => state.entries.entryList);
    const userName = useSelector((state: RootStateType) => state.user?.userName);
    const [isEntryOpen, setEntryOpen] = useState<boolean>(false);
    // const [entryTitle, setEntryTitle] = useState<string>('');
    // const [entryContent, setEntryContent] = useState<string>('');
    // const [canEditEntry, setCanEditEntry] = useState<boolean>(false)
    const dispatch = useAppDispatch();
    const { diaryId } = useParams();
    // const [canEdit, setCanEdit] = useState<boolean>(true);

    const onEntrySave = (title:string, content:string,)=>{
        request.post<{title:string, content:string, diaryId:string}, {diary:Diary, entry:Entry}>(`/diaries/entries/${diaryId}`,
        {title, content, diaryId})
        .then(({diary,entry})=> {
            dispatch(updateDiary(diary));
            dispatch(addEntry(entry));
        }).catch(error=> console.log(error));
    }

    const afterRender = () => {
        request.get<{}, { entries: Entry[] }>(`/diaries/entries/${diaryId}`)
            .then(data => { dispatch(updateEntries(data.entries)) })
            .catch(error => { console.log(error) });
    }
    useEffect(afterRender, [])

    return (
        <>
            {!isEntryOpen || <EntryInput visible={isEntryOpen} onCancel={() => { setEntryOpen(false) }} onSave={onEntrySave} />}
            <div className={`${style.diaryEntryContainer}`} >
                <div><h1><Link to={`/${userName}`}>⮜ Diaries</Link> \ Entries</h1></div>
                <div ><button title='add entry' onClick={()=>{setEntryOpen(true)}} className={`${style.addBtn}`} >+</button></div>
                {
                    entryList.map(({id, title, content, updatedAt, createdAt }, idx) => (
                        <EntryTile
                            key={idx}
                            id={id}
                            title={title}
                            content={content}
                            updatedAt={updatedAt}
                            createdAt={createdAt}
                            // onClick={()=>{ setEntryOpen(true); setEntryTitle(title); setEntryContent(content)}}
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