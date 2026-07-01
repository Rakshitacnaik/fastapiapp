import type {Job} from "./Job";
interface Company{
    id:number;
    name:string;
    email:string;
    phone:string;
    location:string;
    jobs:Job[];
}
export type {Company}
