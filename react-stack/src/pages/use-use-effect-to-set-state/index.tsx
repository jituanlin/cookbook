import {useState} from "react";

interface Student {
    id:string;
    name:string;
}

// mock API request
const fetchData = async ():Promise<Student[]> => [
    { id:'0', name:'linjituan'}
]

export const UseEffectToSetStateExample = () => {
    const  [students,setStudents] = useState<Student[]>()
    const
}
