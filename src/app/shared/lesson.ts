import { course } from "./course";

export class lesson {
    id:number;
    name:string;
    description:string;
    courseId:course["id"];
}