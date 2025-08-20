import { useEffect, useState } from 'react';

export default function ApiTest() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://139.59.154.26:8000/api/todos/')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}
