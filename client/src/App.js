import {UilTimes} from '@iconscout/react-unicons';
import { useEffect, useState } from 'react';
import {ThreeCircles} from 'react-loader-spinner';
import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [todos, setTodos] = useState([]);
  const [popup, setPopup] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    getTodos();
  },[])

  async function getTodos(){
    try{
      setLoading(true);
      const response = await fetch('https://mern-todo-vert.vercel.app/');
      const data = await response.json();
      setLoading(false);
      setTodos(data);
    }catch(err){
      console.log(err);
    }
  }

  async function createTodo(){
    try{
      if(newTodo.trim() !== ""){
        setLoading(true);
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
        setLoading(false);
        toast.success('Todo Added Successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
      setLoading(true);
      const response = await fetch(`https://mern-todo-vert.vercel.app/${todoId}`,{
        'method': 'DELETE',
      });

      const data = await response.json();
      setLoading(false);
      toast.success('Todo Delete Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTodos(todos=>todos.filter(todo=>todo._id !== data._id));
    }catch(err){
      console.log(err);
    }
  }

    async function completeTodo(todoId){
    try{
      setLoading(true);
      const response = await fetch(`https://mern-todo-vert.vercel.app/${todoId}`,{
      'method': 'PUT'
    });

      const data = await response.json();
      setLoading(false);
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

  console.log(todos); 

  return (
    <div className="container">
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h1>Hello todos</h1>
      <div className="todos">
        {
          loading && (
            <div className="spinner">
              <ThreeCircles
                height="50"
                width="50"
                color="#8F43EE"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
              />
            </div>
          )
        }
        {
          todos.length > 0 && !loading && todos.map((todo)=>(
            <div className={todo.complete? "todo is-completed" : "todo"} key={todo._id} onClick={()=>completeTodo(todo._id)}>
              <div className="checkbox"></div>
              <div className="text">{todo.text}</div>
              <div className="delete" onClick={()=>deleteTodo(todo._id)}><UilTimes /></div>
            </div>
          ))
        }
        {
          todos.length === 0 && !loading && (
            <div className="no-todo">Empty Todos!</div>
          )
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
