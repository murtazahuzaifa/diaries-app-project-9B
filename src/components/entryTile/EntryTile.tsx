import React, { FC, useState } from 'react';
// import { Diary } from '../../interfaces/diary.interface';
import { Entry } from '../../interfaces/entry.interface';
import style from './EntryTile.module.css';
import request from '../../services/request';
import { useAppDispatch } from '../../store/store';
import { updateEntry } from '../../pages/userHome/entrySlice';
import { showAlert } from '../../utils';
// import { updateDiary } from '../../pages/userHome/diarySlice';
// import { Merge } from '../../utils';
import { Visibility } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
// import Swal from 'sweetalert2';
import EntryInput from '../../components/entryInput/EntryInput';
// import { LockOutlined, LockOpenOutlined } from '@material-ui/icons'
// import { BorderBtn, FilledBtn } from '../../components/buttons/AppButtons';

// type EventTypes = {
//     onClick?: () => void,
// }
// type PropType = Merge<Entry, EventTypes>

const EntryTile: FC<Partial<Entry>> = ({ id, title, content, createdAt, updatedAt }) => {

    const [isEntryOpen, setEntryOpen] = useState<boolean>(false);
    const [entryTitle, setEntryTitle] = useState<string>('');
    const [entryContent, setEntryContent] = useState<string>('');
    const handleOnView = () => { setEntryOpen(true); setEntryTitle(title || ''); setEntryContent(content || "") }
    const dispatch = useAppDispatch();

    const onEntrySave = (title: string, content: string,) => {
        request.put<{ title: string, content: string }, Entry>(`/diaries/entries/${id}`,
            { title, content })
            .then((entry) => {
                dispatch(updateEntry(entry));
                return showAlert('Entry Updated', 'success');
            }).catch(error => console.log(error));
    }

    return (
        <>
            <div className={`${style.entryTile}`} title='view entry' >
                <div><h2>{title}</h2></div>
                <div><span>Created at:</span> {createdAt}</div>
                <div><span>Updated at:</span> {updatedAt}</div>
                <div><p>{content}</p></div>
                <div className={`${style.viewBtn}`} ><IconButton onClick={handleOnView} title='view entry' color="inherit" ><Visibility /></IconButton></div>
                {!isEntryOpen || <EntryInput visible={isEntryOpen} canEdit={false} onCancel={() => { setEntryOpen(false) }} onSave={onEntrySave} title={entryTitle} content={entryContent} />}
            </div>
        </>
    )
}

export default EntryTile;
