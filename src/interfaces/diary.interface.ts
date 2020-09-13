export interface Diary {
    id: string;
    userId: string;
    title: string;
    type: "Private" | "Public";
    createdAt: string;
    updatedAt: string;
    entryIds: string[] | null;
}