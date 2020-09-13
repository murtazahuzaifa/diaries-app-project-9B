import { Server, Model, Factory, Response, hasMany, belongsTo } from 'miragejs';
import * as user from './routes/user';
import * as diary from './routes/diary';
import { randomBytes } from 'crypto';

export const errorResponse = (error: any, message = 'request error') => {
    console.log("ERROR", error)
    return new Response(400, undefined, {
        data: {
            message,
            isError: true
        }
    })
}

export const runServer = (env?: string): Server => {
    return new Server({
        environment: env || 'development',

        models: {
            user: Model.extend({
                diary: hasMany(),
            }),
            diary: Model.extend({
                user: belongsTo(),
                entry: hasMany(),
            }),
            entry: Model.extend({
                diary: belongsTo(),
            }),
        },

        factories: {
            user: Factory.extend({
                userName: 'superuser',
                password: '12345678',
                email: 'superuser@gmail.com',
                token() { return randomBytes(8).toString('hex') },
            }),
            diary: Factory.extend({
                type: 'Public',
                userId: '1',
                title: 'My codes',
            }),
            
            entry: Factory.extend({
                diaryId: '1',
                title: 'My Code',
                content: 'This is my code',
            })
        },

        seeds: (server): any => {
            server.create('user');
            server.create('diary');
        },

        routes() {
            this.urlPrefix = 'http://mydiary.app';
            // this.namespace = "/app"

            this.get('/diaries/:userid', diary.getDiaries );
            this.get('/diaries/entries/:diaryid', diary.getEntries );
            // this.get('/getdiaries', (_:any, req:any):any =>{
                
            //     return _.diaries.all()
            // });

            this.post('/auth/login', user.login);
            this.post('/auth/signup', user.signUp);
            this.post('/diaries/:userid', diary.createDiary);
            this.post('/diaries/entries/:diaryid', diary.addEntry);

            this.put('/diaries/:diaryid', diary.updateDiary);
            this.put('/diaries/entries/:entryid', diary.updateEntry);
        }
    })
}









// fetch('http://mydiary.app/auth/login', {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         token: 'sdfsdfsdf',
//       },
//     body: JSON.stringify({ username: 'superuser', password: '123' })
// })
//     .then(res => res.json).then(data => { console.log(data) })
//     .catch((error) => {
//         console.log("Error", error)
//     })