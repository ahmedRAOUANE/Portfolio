import { UploadFileResponse } from "./file";

export interface Project {
    id?: number;
    name: string;
    created_at?: string;
    description: string;
    project_link: string;
    image: UploadFileResponse;
    is_active: string;
}