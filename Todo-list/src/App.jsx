import { useState } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [lists, setLists] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleClick = () => {
    if (input) {
      if (editIndex !== null) {
        const updatedLists = lists.map((list, index) =>
          editIndex === index ? input : list
        );
        setLists(updatedLists);
        setEditIndex(null);
      } else {
        setLists([...lists, input]);
      }
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const editLists = (i) => {
    setInput(lists[i]);
    setEditIndex(i);
  };

  const removeInput = () => {
    setInput("");
    setEditIndex(null);
  };

  const deleteList = (i) => {
    const updatedList = lists.filter((list, index) => index !== i);
    setLists(updatedList);
  };
  return (
    <div className="container" style={{ margin: "20px" }}>
      <h1 className="heading">Todo List</h1>
      <input
        type="text"
        name="todo"
        id="todo-input"
        style={{ width: "60%", border: "1px solid", height: "40px" }}
        placeholder="Enter your todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div>
        <button style={{ border: "1px solid" }} onClick={handleClick}>
          Submit
        </button>
        <button
          style={{ border: "1px solid", margin: "2px" }}
          onClick={removeInput}
        >
          Cancel
        </button>
      </div>
      <ul>
        {lists.map((list, i) => (
          <li key={i}>
            {list}
            <button
              style={{ border: "1px solid", margin: "2px" }}
              onClick={() => editLists(i)}
            >
              Edit
            </button>
            <button
              style={{ border: "1px solid", margin: "2px" }}
              onClick={() => deleteList(i)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
