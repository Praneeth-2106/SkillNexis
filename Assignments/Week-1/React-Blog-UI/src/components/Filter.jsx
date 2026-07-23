function Filter({ category, setCategory }) {
  return (
    <select
      className="filter"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option>All</option>
      <option>React</option>
      <option>JavaScript</option>
      <option>CSS</option>
      <option>Backend</option>
      <option>Database</option>
    </select>
  );
}

export default Filter;