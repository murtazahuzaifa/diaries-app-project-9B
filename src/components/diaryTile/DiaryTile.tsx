import React, { FC, useState } from 'react';
import { Diary } from '../../interfaces/diary.interface';
import { LockOutlined, LockOpenOutlined, Edit } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { BorderBtn, FilledBtn } from '../../components/buttons/AppButtons';
import style from './DiaryTile.module.css';
import { useNavigate } from 'react-router';
import { RootStateType } from '../../store/parentReducer';
import { useSelector } from 'react-redux';
import request from '../../services/request';
import { showAlert } from '../../utils';
import { useAppDispatch } from '../../store/store';
import { addEntry } from '../../pages/userHome/entrySlice';
import { updateDiary } from '../../pages/userHome/diarySlice';
import { Entry } from '../../interfaces/entry.interface';
import EntryInput from '../../components/entryInput/EntryInput';
import Swal from 'sweetalert2';
// import {addNewEntry} from '../../components/entryInput/entryInputSlice';
// import {} from '../../pages/auth/userSlice';

const DiaryTile: FC<Diary> = ({ id, entryIds, title, updatedAt, createdAt, type }) => {
    const userName = useSelector((state: RootStateType) => state.user?.userName);
    const [isEntryOpen, setEntryOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleViweAll = () => { navigate(`/${userName}/diary/${id}`) }
    const noOfEntry = entryIds?.length || 0;
    const dispatch = useAppDispatch();

    const onEntrySave = (title: string, content: string,) => {
        request.post<{ title: string, content: string, diaryId: string }, { diary: Diary, entry: Entry }>(`/diaries/entries/${id}`,
            { title, content, diaryId: id })
            .then(({ diary, entry }) => {
                dispatch(updateDiary(diary));
                dispatch(addEntry(entry));
                return showAlert('Entry added', 'success');
            }).catch(error => console.log(error));
    }

    const editDirayTitle = async () => {
        const { value } = await Swal.mixin({
            input: 'text',
            confirmButtonText: 'Save 🖫',
            confirmButtonColor: "rgb(0, 170, 0)",
            showCancelButton: true,
            progressSteps: ['1'],
        }).queue<{ value: string[] }>([
            {
                titleText: 'Diary title',
                input: 'text',
                inputValue: title,
            },
        ]);
        if (value && value[0]) {
            await request.put<{ title: string }, Diary>(`/diaries/${id}`, { title: value[0] })
                .then(diary => {
                    dispatch(updateDiary(diary));
                    return showAlert('Diary Title Updated', 'success');
                })
                .catch(error => console.log(error));
            return
        }
        Swal.fire({
            titleText: 'Cancelled',
            confirmButtonColor: "rgb(170, 0, 0)",
        });
    }

    return (
        <>
            {!isEntryOpen || <EntryInput visible={isEntryOpen} onCancel={() => { setEntryOpen(false) }} onSave={onEntrySave} />}
            <div className={`${style.diaryTile}`} >
                <div><h1>{title}</h1></div>
                <div>{noOfEntry} {noOfEntry < 2 ? "entry" : "entries"} saved</div>
                <div><span>Created at:</span> {createdAt}</div>
                <div><span>Updated at:</span> {updatedAt}</div>
                <div className={`${style.lockIcon}`} style={{ color: type?.toLowerCase() === 'public' ? 'green' : 'brown' }} > {type?.toLowerCase() === 'public' ? <LockOpenOutlined /> : <LockOutlined />}<span>{type}</span> </div>
                <div className={`${style.buttons}`} >
                    <div><FilledBtn onClick={() => { setEntryOpen(true) }} >add entry</FilledBtn></div>
                    <div><BorderBtn title="view all entries" r_arrow={true} onClick={handleViweAll} >view all </BorderBtn></div>
                </div>
                <div className={`${style.editBtn}`} ><IconButton onClick={editDirayTitle} title='edit title' color="inherit" ><Edit fontSize='small' /></IconButton></div>
            </div>
        </>
    )
}

export default DiaryTile;

// {/* <Avatar aria-label="user-name" className={classes.avatar} > R </Avatar> */ }