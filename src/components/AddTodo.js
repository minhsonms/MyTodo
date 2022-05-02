import React, { useState } from "react";
//class AddTodo extends React.Component {
function AddTodo(props) {
  /*state = {
    title: "",
  };
  onInputChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };*/

  const [title, setTitle] = useState("");
  const onInputChange = (e) => {
    setTitle(e.target.value);
  };

  /*addTodo = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({
      title: "",
    });
  };*/
  const addTodo = (e) => {
    e.preventDefault();
    props.addTodo(title);
    setTitle("");
  };
  return (
    <form className="form-container" onSubmit={addTodo}>
      <input
        type="text"
        placeholder="Add Todo..."
        className="input-text"
        //value={this.state.title}
        // onChange={this.onInputChange}
        value={title}
        onChange={onInputChange}
      />
      <input type="submit" value="Submit" className="input-submit" />
    </form>
  );
}
export default AddTodo;
