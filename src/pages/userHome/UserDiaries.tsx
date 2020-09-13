import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../store/parentReducer';
import DiaryTile from '../../components/diaryTile/DiaryTile';
import { Diary } from '../../interfaces/diary.interface';
import { User } from '../../interfaces/user.interface';
import Swal from 'sweetalert2';
import request from '../../services/request';
import { useAppDispatch } from '../../store/store';
import {addDiary} from './diarySlice';
import {setUser} from '../auth/userSlice';
// import { Entry } from '../../interfaces/entry.interface';
// import { Entry } from '../../interfaces/entry.interface';
// import {diarySlice} from './diarySlice';
// import GreenButton from '../../components/buttons/GreenButton';
import style from './UserHome.module.css';

const UserDiaries: FC = () => {
    const diaryList = useSelector((state: RootStateType) => state.diaries.diaryList);
    const userId = useSelector((state: RootStateType) => state.user?.id);
    const dispatch = useAppDispatch();

    const createDiary = async () => {
        const {value} = await Swal.mixin({
            input: 'text',
            confirmButtonText: 'Next &rarr;',
            confirmButtonColor: "rgb(0, 170, 0)",
            showCancelButton: true,
            progressSteps: ['1', '2'],
        }).queue<{ value: string[] }>([
            {
                titleText: 'Diary title',
                input: 'text',
            },
            {
                titleText: 'Private or public diary?',
                input: 'radio',
                inputOptions: {
                    private: 'Private',
                    public: 'Public',
                },
                inputValue: 'private',
            },
        ]);

        if (value[0] && value[1]) {
            await request.post<{title:string,type:string,userId:string},{user:User,diary:Diary}>(`/diaries/${userId}`,{
                title: value[0],
                type: value[1],
                userId
            }).then(({diary, user})=>{
                dispatch(addDiary(diary))
                dispatch(setUser(user))
                console.log(diary);
            }).catch(error =>{ console.log(error) } )
            
            return Swal.fire({
                titleText: 'New Diary Created',
                confirmButtonText: 'OK!',
                confirmButtonColor: "rgb(0, 170, 0)",
              });
        }
        Swal.fire({
            titleText: 'Unable to create new diary',
            confirmButtonColor: "rgb(170, 0, 0)",
        });
    };

    return (
        <div className={`${style.diaryEntryContainer}`} >
            <div><h1>Diaries</h1></div>
            <div ><button title='create diary' onClick={createDiary} className={`${style.addBtn}`} >+</button></div>
            {/* <div><DiaryTile id='1' title='My diary' updatedAt='1:00 pm' createdAt='12:00 Am' type='Public' /></div> */}
            {/* <div><DiaryTile id='1' title='My diary' updatedAt='1:00 pm' createdAt='12:00 Am' type='Public' /></div> */}
            {diaryList.map((diary, idx: number) => (
                <div key={idx}><DiaryTile  {...diary} /></div>
            ))}
        </div>
    )
}
// {id, title, updatedAt, createAt,type}
export default UserDiaries;