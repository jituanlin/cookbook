/**
 * The following code is an example to show should not `setState` by `useEffect` on other state.
 * see: https://jituanlin.github.io/react/2020-08-12-React-hook-%E5%B8%B8%E8%A7%81%E9%99%B7%E9%98%B1/
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
  const [students, setStudents] = useState<Student[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  // DON'T do that!
  useEffect(() => {
    setIsLoading(students === undefined);
  }, [students]);

  useEffect(() => {
    const fetchThenSetStudents = async () => {
      const students = await fetchStudents();
      setStudents(students);
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
