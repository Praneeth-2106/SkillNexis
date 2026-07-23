import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const loadTasks = async () => {
    try {
      const res = await API.get("/tasks", {
        headers: {
          Authorization: token,
        },
      });

      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

    await API.post(
      "/tasks",
      { title },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setTitle("");
    loadTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    loadTasks();
  };

  const toggleComplete = async (task) => {
    try {
      await API.put(
        `/tasks/${task._id}`,
        {
          completed: !task.completed,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      loadTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (id) => {
    if (!editTitle.trim()) return;

    try {
      await API.put(
        `/tasks/${id}`,
        {
          title: editTitle,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setEditingId(null);
      setEditTitle("");
      loadTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h2>Task Manager</h2>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
        />

        <button className="add-btn" onClick={addTask}>
          Add Task
        </button>
      </div>

      {/* Task Statistics */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "20px 0",
          fontWeight: "bold",
        }}
      >
        <div>Total: {tasks.length}</div>
        <div>
          Completed: {tasks.filter((t) => t.completed).length}
        </div>
        <div>
          Pending: {tasks.filter((t) => !t.completed).length}
        </div>
      </div>

      {/* Filter Buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <button className="add-btn" onClick={() => setFilter("all")}>
          All
        </button>

        <button className="add-btn" onClick={() => setFilter("completed")}>
          Completed
        </button>

        <button className="add-btn" onClick={() => setFilter("pending")}>
          Pending
        </button>
      </div>

      <hr />

      {tasks
        .filter((task) => {
          if (filter === "completed") return task.completed;
          if (filter === "pending") return !task.completed;
          return true;
        })
        .map((task) => (
          <div className="task" key={task._id}>
            <div className="task-left">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task)}
              />

              {editingId === task._id ? (
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateTask(task._id);
                    }
                  }}
                  autoFocus
                />
              ) : (
                <span
                  style={{
                    textDecoration: task.completed
                      ? "line-through"
                      : "none",
                    color: task.completed ? "gray" : "black",
                  }}
                >
                  {task.title}
                </span>
              )}
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              {editingId === task._id ? (
                <button
                  className="add-btn"
                  onClick={() => updateTask(task._id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="add-btn"
                  onClick={() => {
                    setEditingId(task._id);
                    setEditTitle(task.title);
                  }}
                >
                  Edit
                </button>
              )}

              <button
                className="delete-btn"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Dashboard;