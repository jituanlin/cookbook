/**
 * The following code is a refactored version of `./index.tsx`.
 * */
import React, { useEffect, useState } from "react";
import { TimeOut } from "../../utils/TimeOut";

interface Student {
  id: string;
  name: string;
}

// mock API request
const fetchStudents = async (): Promise<Student[]> => {
  await TimeOut(2000);
  return [{ id: "0", name: "linjituan" }];
};

export const UseEffectToSetStateExample = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchThenSetStudents = async () => {
      const students = await fetchStudents();
      setStudents(students);
      setIsLoading(false);
    };
    fetchThenSetStudents();
  }, []);

  return (
    <div>
      {isLoading && <p>loading...</p>}
      {students?.map((student) => (
        <p key={student.id}>name: {student.name}</p>
      ))}
    </div>
  );
};
