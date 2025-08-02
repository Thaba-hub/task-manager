
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    await axios.post("http://localhost:5000/tasks", { title: newTask, completed: false });
    setNewTask("");
    fetchTasks();
  };

  const toggleTask = async (index) => {
    const task = tasks[index];
    task.completed = !task.completed;
    await axios.put(`http://localhost:5000/tasks/${index}`, task);
    fetchTasks();
  };

  const deleteTask = async (index) => {
    await axios.delete(`http://localhost:5000/tasks/${index}`);
    fetchTasks();
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <input value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="New Task" />
      <button onClick={addTask}>Add</button>
      {tasks.map((task, i) => (
        <div key={i} className="task">
          <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.title}
          </span>
          <div>
            <button onClick={() => toggleTask(i)}>Toggle</button>
            <button onClick={() => deleteTask(i)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
