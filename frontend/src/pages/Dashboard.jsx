import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const { logout, user } = useAuth();

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    await api.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    //fetchTasks();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Role: {user?.role}</p>
      <button onClick={logout}>Logout</button>

      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            {user?.role === "admin" && (
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
