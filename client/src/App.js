import {UilTimes} from '@iconscout/react-unicons';
import { useEffect, useState } from 'react';
import {ThreeCircles} from 'react-loader-spinner';
import {FaEdit, FaSearch} from 'react-icons/fa'
import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Popup from './components/Popup';

function App() {

  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [popup, setPopup] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [editTodo, setEditTodo] = useState({text: ""});
  const [searchValue, setSearchValue] = useState("");
  const [checkedValue, setCheckedValue] = useState("all");

  useEffect(()=>{
    getTodos();
  },[]);

  useEffect(()=>{
    if(checkedValue === "all"){
      setFilteredTodos(todos.filter((todo)=>todo.text.toLowerCase().includes(searchValue.toLowerCase())));
    }else if(checkedValue === "active"){
      setFilteredTodos(todos.filter((todo)=>{
        return todo.complete && todo.text.toLowerCase().includes(searchValue.toLowerCase())
      }));
    }
    else if(checkedValue === "inactive"){
      setFilteredTodos(todos.filter((todo)=>{
        return !todo.complete && todo.text.toLowerCase().includes(searchValue.toLowerCase())
      }));
    }
  },[checkedValue, searchValue, todos]);

  async function getTodos(){
    try{
      setLoading(true);
      const response = await fetch('https://mern-todo-vert.vercel.app/');
      const data = await response.json();
      setLoading(false);
      setTodos(data);
      setFilteredTodos(data);
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
        if(checkedValue === "all"){
          setFilteredTodos(todos.filter((todo)=>todo.text.toLowerCase().includes(searchValue.toLowerCase())));
        }else if(checkedValue === "inactive"){
          setFilteredTodos(todos.filter((todo)=>{
            return !todo.complete && todo.text.toLowerCase().includes(searchValue.toLowerCase())
          }));
        }
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
      setFilteredTodos(todos=>todos.filter(todo=>todo._id !== data._id));
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
      setFilteredTodos(todos=>todos.map(todo=>{
        if(todo._id === data._id){
          todo.complete = data.complete;
        }
        return todo;
      }));
    }catch(err){
      console.log(err);
    }
  }

  function createTodoHandler(name, todoText){
    if(name==="Create"){
      setNewTodo(todoText);
    }else{
      setEditTodo({...editTodo, text: todoText});
    }
  }

  function popupHandler(value){
    setPopup(value);
  }

  async function updateTodo(){
    try{
      setLoading(true);
      const response = await fetch(`https://mern-todo-vert.vercel.app/updateText/${editTodo.id}`, {
        'method': 'PUT',
        'headers': {
          'content-type': 'application/json'
        },
        'body': JSON.stringify({
          text: editTodo.text
        })
      })

      const data = await response.json();

      setLoading(false);
      toast.success('Todo Updated Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTodos(todos=>todos.map((todo)=>{
        if(todo._id === data._id){
          return {...todo, text: data.text};
        }
        return todo;
      }));
      setFilteredTodos(filteredTodos=>filteredTodos.map((todo)=>{
        if(todo._id === data._id){
          return {...todo, text: data.text};
        }
        return todo;
      }));
      setPopup(false);
      setEditTodo({...editTodo, text: ""});
    }catch(err){
      console.log(err);
    }
  }

  function handleSearchFilter(e){
    setSearchValue(e.target.value);
  }

  function handleCheckedChange(e){
    setCheckedValue(e.target.value);
  }

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
      <h1>My todos</h1>
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

        <div className="search-todo">
          <input type="text" placeholder='Search Todo' value={searchValue} onChange={handleSearchFilter} />
          <div className="search-icon"><FaSearch /></div>
        </div>

        <div className="filter-option">
          <div className="all">
            <input type="radio" name="filter" id="all" value="all" checked={checkedValue==="all"} onChange={handleCheckedChange} /><label htmlFor='all'>All</label>
          </div> 
          <div className="active">
            <input type="radio" name="filter" id="active" value="active" checked={checkedValue==="active"} onChange={handleCheckedChange} /><label htmlFor='active'>Active</label>
          </div> 
          <div className="inactive">
            <input type="radio" name="filter" id="inactive" value="inactive" checked={checkedValue==="inactive"} onChange={handleCheckedChange} /><label htmlFor='inactive'>Inactive</label>
          </div> 
        </div>

        {
          filteredTodos.length > 0 && !loading && filteredTodos.map((todo)=>(
            <div className={todo.complete? "todo is-completed" : "todo"} key={todo._id} onClick={()=>completeTodo(todo._id)}>
              <div className="checkbox"></div>
              <div className="text">{todo.text}</div>
              <div className="edit" onClick={(e)=>{e.stopPropagation();setEditTodo({id: todo._id, text: editTodo.text !== "" ? editTodo.text: todo.text}); setPopup("edit");}}><FaEdit /></div>
              <div className="delete" onClick={(e)=>{e.stopPropagation();deleteTodo(todo._id)}}><UilTimes /></div>
            </div>
          ))
        }
        {
          filteredTodos.length === 0 && !loading && (
            <div className="no-todo">Empty Todos!</div>
          )
        }
      </div>

      <div className="popupbtn" onClick={()=>setPopup("create")}>+</div>

      {
        popup && (popup==="create" ? (
          <Popup 
            todoTextHandler={createTodoHandler} 
            value={newTodo}  
            onClickHandler={createTodo} 
            popupHandler = {popupHandler}
            buttonText = {"Create"}
          />
        ) : (
          <Popup 
            todoTextHandler={createTodoHandler} 
            value={editTodo.text}  
            onClickHandler={updateTodo} 
            popupHandler = {popupHandler}
            buttonText = {"Update"}
          />
        ))
      }
    </div>
  );
}

export default App;
