import React, { useState } from "react";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEmptyMessageVisible, setIsEmptyMessageVisible] = useState(true);

  const handleAddTask = () => {
    if (newTask.trim() === "") return;

    setTasks([...tasks, { text: newTask, isEditing: false }]);
    setNewTask("");
    setIsEmptyMessageVisible(false);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setIsEmptyMessageVisible(updatedTasks.length === 0);
  };

  const handleEditTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, isEditing: true } : task
    );
    setTasks(updatedTasks);
  };

  const handleSaveTask = (index, editedText) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: editedText, isEditing: false } : task
    );
    setTasks(updatedTasks);
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "Arial, sans-serif" }}>
      <header>
        <h1 style={{ marginBottom: "20px" }}>Todo List</h1>
      </header>

      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Add a task"
        style={{
          padding: "10px",
          fontSize: "1rem",
          width: "80%",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {isEmptyMessageVisible && (
        <div style={{ fontSize: "1.5rem", color: "gray", margin: "1rem" }}>Ooops! List is empty</div>
      )}

      <ul style={{ listStyleType: "none", padding: 0, width: "80%" }}>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: "#f9f9f9",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          >
            {task.isEditing ? (
              <input
                type="text"
                defaultValue={task.text}
                onBlur={(e) => handleSaveTask(index, e.target.value)}
                autoFocus
                style={{
                  flex: "1",
                  padding: "5px",
                  fontSize: "1rem",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            ) : (
              <span style={{ flex: "1", fontSize: "1.1rem" }}>{task.text}</span>
            )}
            <div style={{ display: "flex", gap: "10px" }}>
              {!task.isEditing ? (
                <img
                  src="https://cdn-icons-png.flaticon.com/256/588/588395.png"
                  alt="Edit"
                  onClick={() => handleEditTask(index)}
                  style={{ cursor: "pointer", width: "20px", height: "20px" }}
                />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/256/3106/3106887.png"
                  alt="Save"
                  onClick={() => handleSaveTask(index, task.text)}
                  style={{ cursor: "pointer", width: "20px", height: "20px" }}
                />
              )}
              <img
                src="https://cdn-icons-png.flaticon.com/256/484/484560.png"
                alt="Delete"
                onClick={() => handleDeleteTask(index)}
                style={{ cursor: "pointer", width: "20px", height: "20px" }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
