import { string } from "yup";

export interface User {
    id: string;
    userName: string;
    password: string;
    email: string;
    diaryIds: string[];
}