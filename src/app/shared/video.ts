import { lesson } from "./lesson";

export class video{
    id!:number;
    name!:string;
    description!:string;
    Url!:string;
    lessonId!:lesson["id"]
}