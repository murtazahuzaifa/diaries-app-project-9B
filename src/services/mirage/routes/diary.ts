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
        const diary = exuser.createDiary({
            title,
            type,
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
        const entry = diary.createEntry({
            title,
            content,
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
        const data = JSON.parse(req.requestBody) as Partial<Diary>;
        const diary = schema.diaries.findBy({ id: diaryid });
        diary.update({ ...data })
        return diary.attrs as Diary
    } catch{
        return errorResponse(null, 'Could not update the diary')
    }
}
export const updateEntry = (schema: any, req: Request): Entry | Response => {
    try {
        const { entryid } = req.params;
        const data = JSON.parse(req.requestBody) as Partial<Entry>;
        const entry = schema.entries.findBy({ id: entryid });
        entry.update({ ...data });
        return entry.attrs as Entry
    } catch{
        return errorResponse(null, 'Could not update the entry');
    }
}