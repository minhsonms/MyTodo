import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Todos from "./Todos";
import AddTodo from "./AddTodo";
//import uuid from "uuid";
import axios from "axios";

//class TodoApp extends React.Component {
function TodoApp() {
  /*state = {
    todos: [],
  };*/
  const [state, setState] = useState({
    todos: [],
  });

  /*handleCheckboxChange = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };
*/
  const handleCheckboxChange = (id) => {
    setState({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  const deleteTodo = (id) => {
    /*this.setState({
      todos: [
        ...this.state.todos.filter((todo) => {
          return todo.id !== id;
        }),
      ],
    });*/
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((reponse) =>
        setState({
          todos: [
            ...state.todos.filter((todo) => {
              return todo.id !== id;
            }),
          ],
        })
      );
  };

  const addTodo = (title) => {
    /* const newTodo = {
      id: uuid.v4(),
      title: title,
      completed: false,
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
    });*/
    const todoData = {
      title: title,
      completed: false,
    };
    axios
      .post("https://jsonplaceholder.typicode.com/todos", todoData)
      .then((response) => {
        console.log(response.data);
        setState({
          todos: [...state.todos, response.data],
        });
      });
  };
 /*componentDidMount() {
    //giới hạn số lượng
    const config = {
      params: {
        _limit: 5,
      },
    };
    //tạo GET request để lấy danh sách todos
    axios
      .get("https://jsonplaceholder.typicode.com/todos", config)
      .then((response) => this.setState({ todos: response.data })); // gắn giá trị vào state
  }*/
  useEffect(() => {
    const config = {
      params: {
        _limit: 5,
      },
    };
    //tạo GET request để lấy danh sách todos
    axios
      .get("https://jsonplaceholder.typicode.com/todos", config)
      .then((response) => setState({ todos: response.data }));
  }, []);
  //render() {
  return (
    <div className="container">
      <Header />
      <AddTodo addTodo={addTodo} />
      <Todos
        todos={state.todos}
        handleChange={handleCheckboxChange}
        deleteTodo={deleteTodo}
      />
    </div>
  );
  // }
 
}
export default TodoApp;
