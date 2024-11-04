import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(null);

  function handleInput(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit() {
    if (edit) {
      setList((prev) =>
        prev.map((listItem) =>
          listItem.id === edit ? { ...listItem, value: inputValue } : item
        )
      );
      setInputValue("");
    } else {
      const id = uuidv4();
      setList((prev) => [...prev, { id, value: inputValue }]);
      setInputValue("");
    }
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  function editItem({ id, value }) {
    setInputValue(value);
    setEdit(id);
  }

  return (
    <>
      <input type="text" value={inputValue} onChange={handleInput} />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!inputValue.trim()}
      >
        {edit ? "Edit" : "Submit"}
      </button>
      <button
        type="button"
        onClick={() => setInputValue("")}
        disabled={!inputValue.trim() && !edit}
      >
        Cancel
      </button>
      {list.length > 0 &&
        list.map((listItem) => (
          <div key={listItem.id}>
            {listItem.value}
            <button onClick={() => editItem(listItem)}>Edit</button>
            <button onClick={() => deleteItem(listItem.id)}>Delete</button>
          </div>
        ))}
    </>
  );
}

export default App;
