import {UilTimes} from '@iconscout/react-unicons';
import { useEffect, useState } from 'react';

function App() {

  const [todos, setTodos] = useState([]);
  const [popup, setPopup] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(()=>{
    getTodos();
  },[])

  async function getTodos(){
    try{
      const response = await fetch('https://mern-todo-vert.vercel.app/');
      const data = await response.json();
      console.log(data);
      setTodos(data);
    }catch(err){
      console.log(err);
    }
  }

  async function createTodo(){
    try{
      if(newTodo.trim() !== ""){
        const response = await fetch('https://mern-todo-vert.vercel.app/',{
        'method': 'POST',
        'headers': {
          'content-type': 'application/json'
        },
        'body': JSON.stringify({
          text: newTodo
        })
      })
        const data = await response.json();
        setTodos([...todos, data]);
        setPopup(false);
        setNewTodo("");
      }
    }catch(err){
      console.log(err);
    }
  }
  
  async function deleteTodo(todoId){
    try{
      const response = await fetch(`https://mern-todo-vert.vercel.app/${todoId}`,{
        'method': 'DELETE',
      });

      const data = await response.json();

      setTodos(todos=>todos.filter(todo=>todo._id !== data._id));
    }catch(err){
      console.log(err);
    }
  }

    async function completeTodo(todoId){
    try{
      const response = await fetch(`https://mern-todo-vert.vercel.app/${todoId}`,{
      'method': 'PUT'
    });

      const data = await response.json();

      setTodos(todos=>todos.map(todo=>{
        if(todo._id === data._id){
          todo.complete = data.complete;
        }
        return todo;
      }));
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="container">
      <h1>My todos</h1>
      <div className="todos">
        {
          todos && todos.map((todo)=>(
            <div className={todo.complete? "todo is-completed" : "todo"} key={todo._id} onClick={()=>completeTodo(todo._id)}>
              <div className="checkbox"></div>
              <div className="text">{todo.text}</div>
              <div className="delete" onClick={()=>deleteTodo(todo._id)}><UilTimes /></div>
            </div>
          ))
        }
      </div>

      <div className="popupbtn" onClick={()=>setPopup(true)}>+</div>

      {
        popup && (
          <div className="add-todo-overlay">
            <div className="add-todo">
              <div className="close-btn" onClick={()=>setPopup(false)}><UilTimes /></div>
              <h3>ADD TODO</h3>
              <input 
                type="text"
                value={newTodo}
                onChange={(e)=>setNewTodo(e.target.value)}
              />
              <button onClick={createTodo}>Create Todo</button>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default App;
