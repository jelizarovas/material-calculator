import React, { useState } from "react";
import { useFirestore, useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
// import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export const Estimates = () => {
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState("");
  const firestore = useFirestore();
  function addTodo() {
    const payload = { text: input };
    setInput("");
    if (!!editId) {
      const tempId = editId;
      setEditId("");
      return firestore.collection("todos").doc(tempId).update(payload);
    }
    return firestore.collection("todos").add(payload);
  }

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleEdit = (id, text) => {
    return function (e) {
      setInput(text);
      setEditId(id);
    };
  };

  return (
    <div>
      <h1>Estimates</h1>
      <input
        className="p-2 px-4 m-1 rounded-md"
        value={input}
        onChange={handleChange}
        placeholder="Add todo"
        onKeyPress={(e) => {
          if (e.key === "Enter") addTodo();
        }}
        onFocus={(e) => e.target.select()}
      />
      <button className="bg-red-500 p-2 m-1 rounded-md text-white" onClick={addTodo}>
        {!!editId ? "Edit" : "Add"} estimate
      </button>
      <ListEstimates handleEdit={handleEdit} />
    </div>
  );
};

const ListEstimates = ({ handleEdit }) => {
  const firestore = useFirestore();

  useFirestoreConnect([
    "todos", // { path: '/todos' } // object notation
  ]);

  const todos = useSelector((state) => state.firestore.ordered.todos);

  if (!isLoaded(todos)) {
    return <div>Loading...</div>;
  }

  if (isEmpty(todos)) {
    return <div>Todos List Is Empty</div>;
  }

  const handleDelete = (id) => {
    return async function (e) {
      console.log(id);
      const res = await firestore.collection("todos").doc(id).delete();
      console.log(res);
      return res;
    };
  };

  return (
    <div>
      <ul>
        {todos.map((key, id) => (
          <li key={key} id={id} todo={todos[key]}>
            {JSON.stringify(key)}
            <button className="bg-red-500 text-white p-2 px-4 m-1 rounded-sm" onClick={handleDelete(key.id)}>
              x
            </button>
            <button className="bg-green-500 text-white p-2 px-4 m-1 rounded-sm" onClick={handleEdit(key.id, key.text)}>
              edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
