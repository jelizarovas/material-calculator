import React, { useState } from "react";
import { connect } from "react-redux";
import { addWare } from "../../redux/actions";

const AddWare = (props) => {
  const [input, setInput] = useState("");

  const onChange = (e) => setInput(e.target.value);

  const handleAddWare = () => {
    props.addWare(input);
    setInput("");
  };

  return (
    <div>
      <input
        onChange={onChange}
        value={input}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleAddWare();
        }}
        onFocus={(e) => e.target.select()}
      />
      <button className="add-ware bg-green-500 p-2 rounded-md text white" onClick={handleAddWare}>
        Add Ware
      </button>
    </div>
  );
};

export default connect(null, { addWare })(AddWare);
