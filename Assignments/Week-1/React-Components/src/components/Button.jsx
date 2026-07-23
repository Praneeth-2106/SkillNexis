function Button({ text }) {
  return (
    <button
      className="btn"
      onClick={() => alert(`${text} clicked!`)}
    >
      {text}
    </button>
  );
}

export default Button;