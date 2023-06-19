import React, { useState } from 'react';
import { Form, Container, Button, Alert, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { FaPlus, FaTrash } from "react-icons/fa";

const TodoList = () => {
  const initialData = JSON.parse(localStorage.getItem("todos")) || []; // Assign an empty array if initialData is null
  const [todoList, setTodoList] = useState(initialData);
    const [text, setText] = useState("");
    const addTodo = () =>{
      if (text.trim() !== "") {
      const newTodo = ([
        { data: text, date: new Date().toLocaleString().split(",")[0], isCompleted: false
      },

        ...todoList,
    ]);
    setText("");
    setTodoList(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
  }
  };
    const todoToggleCompletion = (idx) =>{
         const newTodo = todoList.map((todo, index) =>
         index === idx ? {...todo, isCompleted: !todo.isCompleted} : todo
         );
         setTodoList(newTodo);
         localStorage.setItem("todos", JSON.stringify(newTodo));
    };
    const deleteTodo = (idx) => {
      const response = window.confirm("Do you want to continue ? ");
      if (response) {
      const newTodo = todoList.filter((_, index) =>
       index === idx ? false :true
    );
    setTodoList(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
  }
    };

  return (
    <>
    <Container className="mt-3 text-center" >
        <h3> TodoList App </h3>
        <Form.Control  type="text" value={text}
         onChange={(e)=> setText(e.target.value)}
         onKeyDown = {(e) => (e.key === "Enter" ? addTodo() : null)} />
        <br />
        <Button onClick={addTodo}>
        <FaPlus style={{fontSize:"12px", margin:"0px 0px 5px 0px"}} />
        <label className="ms-2 =">Add</label> 
        </Button>
        <br />
        <br />
        { todoList.length > 0
        ? todoList.map((todo, index) => {
            return (
              <Row>
              <Col xs={10}>
              <Alert 
              variant={todo.isCompleted ? "danger" : "primary"}
            className="text-start"
            style={{cursor:"pointer",
                textDecoration:todo.isCompleted ? "line-through" : "none",
            }}
             onClick={ () =>todoToggleCompletion(index)}
             >
            <h3>{todo.data}</h3>
            <small>{todo.date}</small>
            
            </Alert>
            </Col>
            <Col className="mt-4">
            <FaTrash size="40" color= "red" onClick={() => deleteTodo(index)} />
            </Col>
            </Row>
        );
        })
        : "" }
        
        
    </Container>
    </>
  );
};

export default TodoList;