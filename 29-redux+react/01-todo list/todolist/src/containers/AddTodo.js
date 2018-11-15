import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions";

const AddTodo = ({ dispatch }) => {
  let input;

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!input.value.trim()) {
      window.alert("请输入内容");
      return;
    }
    dispatch(addTodo(input.value));
    input.value = "";
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input ref={node => (input = node)} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default connect()(AddTodo);
