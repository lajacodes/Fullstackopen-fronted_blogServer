import React, { useState, useEffect } from "react";
// import Blog from './components/Blog'
import blogService from "./services/blog";
import Notification from "./components/Notification";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlog] = useState([]);
  const [newBlog, setNewBlog] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((initialNotes) => {
      setBlog(initialNotes);
    });
  }, []);

  // ...

  const handleBlogChange = (e) => {
    setNewBlog(e.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => (
    <form onSubmit={(e) => e.preventDefault()}>
      <input value={newBlog} onChange={handleBlogChange} />
      <button type="submit">save</button>
    </form>
  );

  return (
    <div>
      <h1>log in to application</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          {blogForm()}
        </div>
      )}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          login {showAll ? "important" : "all"}
        </button>
      </div>
    </div>
  );
};

export default App;
