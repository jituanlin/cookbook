interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type MyReadonly2<O, RK extends keyof O> = {
  readonly [K in RK]: O[K];
} &
  O;

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: 'Hey',
  description: 'foobar',
  completed: false,
};

/*todo.title = 'Hello'; // Error: cannot reassign a readonly property
todo.description = 'barFoo'; // Error: cannot reassign a readonly property
todo.completed = true; // OK*/
