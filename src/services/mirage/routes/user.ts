import { Response, Request } from 'miragejs';
import { errorResponse } from '../mirageServer';
import { User } from '../../../interfaces/user.interface';
import { randomBytes } from 'crypto';

export interface AuthResponse {user:User,token:string}

export const login = (schema: any, req: Request): AuthResponse | Response => {
    // console.log('HEADER',req.requestHeaders)
    const { userName, password } = JSON.parse(req.requestBody);
    // console.log(schema.users.findBy({ username }));
    const user = schema.users.findBy({ userName });
    if (!user) {
        return errorResponse(null, 'No user with this username is available')
    }
    if (password !== user.password) {
        return errorResponse(null, 'Incorrect Password')
    }
    return {
        user: user.attrs as User,
        token: user.token
    };
}

export const signUp = (schema: any, req: Request): AuthResponse | Response => {
    // console.log(req.requestHeaders)
    const data = JSON.parse(req.requestBody);
    const exUser = schema.users.findBy({ userName: data.userName });
    if (exUser) {
        return errorResponse(null, 'The user name is already taken')
    }
    const user = schema.users.create({...data, token: randomBytes(8).toString('hex')} );
    // user.createDiary({userId: '2', type:'Private'})
    return {
        user: user.attrs as User,
        token: user.token
    };
}

export { }