export interface Diary {
    id: string;
    userId: string;
    type: "Private" | "Public";
    entryIds: string[] | null;
    createAt: string;
    updatedAt: string;
}