import { useState } from "react";

function Form() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      alert("Please enter your name.");
      return;
    }

    alert(`Welcome, ${name}!`);
    setName("");
  };

  return (
    <div className="form-container">
      <h2>State Demo Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;