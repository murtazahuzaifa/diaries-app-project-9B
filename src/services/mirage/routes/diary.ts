import { Response, Request } from 'miragejs';
import { errorResponse } from '../mirageServer';
import { Diary } from '../../../interfaces/diary.interface';
import { Entry } from '../../../interfaces/entry.interface';
import { User } from '../../../interfaces/user.interface';

export const getDiaries = (schema: any, req: Request): Diary[] | Response => {
    try {
        const userId = req.params.userid
        const exuser = schema.users.findBy({ id: userId });
        return exuser.diary as Diary[]
    } catch{
        return errorResponse(null, 'Could not get user diaries');
    }
};
export const getEntries = (schema: any, req: Request): Entry[] | Response => {
    try {
        const diaryId = req.params.diaryid;
        const diary = schema.diaries.findBy({ id: diaryId });
        return diary.entry as Entry[];
    } catch{
        return errorResponse(null, 'Could not get diary enteries');
    }
};


export const createDiary = (schema: any, req: Request): { user: User, diary: Diary } | Response => {
    try {
        const { title, type, userId } = JSON.parse(req.requestBody) as Partial<Diary>;
        const exuser = schema.users.findBy({ id: userId })
        const now = new Date().toString().split(' ').slice(0,5).join(' ');
        const diary = exuser.createDiary({
            title,
            type,
            createdAt:now,
            updatedAt:now,
        })
        return {
            user: { ...exuser.attrs },
            diary: { ...diary.attrs },
        }
    } catch{
        return errorResponse(null, 'Could not create a diary for the user')
    }
}
export const addEntry = (schema: any, req: Request): { diary: Diary, entry:Entry } | Response => {
    try {
        const {title, content, diaryId} = JSON.parse(req.requestBody);
        const diary = schema.diaries.findBy({id:diaryId})
        const now = new Date().toString().split(' ').slice(0,5).join(' ');
        const entry = diary.createEntry({
            title,
            content,
            createdAt:now,
            updatedAt:now,
        })
        return {
            diary: {...diary.attrs },
            entry: {...entry.attrs },
        }
    } catch{
        return errorResponse(null, 'Could not create an entry for the diary')
    }
}


export const updateDiary = (schema: any, req: Request): Diary | Response => {
    try {
        const { diaryid } = req.params;
        const now = new Date().toString().split(' ').slice(0,5).join(' ');
        const data = JSON.parse(req.requestBody) as Partial<Diary>;
        const diary = schema.diaries.findBy({ id: diaryid });
        diary.update({ ...data, updatedAt:now, })
        return diary.attrs as Diary
    } catch{
        return errorResponse(null, 'Could not update the diary')
    }
}
export const updateEntry = (schema: any, req: Request): Entry | Response => {
    try {
        const { entryid } = req.params;
        const now = new Date().toString().split(' ').slice(0,5).join(' ');
        const data = JSON.parse(req.requestBody) as Partial<Entry>;
        const entry = schema.entries.findBy({ id: entryid });
        entry.update({ ...data, updatedAt:now, });
        return entry.attrs as Entry
    } catch{
        return errorResponse(null, 'Could not update the entry');
    }
}