import { useState } from "react";
import posts from "./data/posts.json";
import BlogCard from "./components/BlogCard";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import "./components/components.css";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || post.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">
      <h1>React Blog Explorer</h1>

      <SearchBar search={search} setSearch={setSearch} />

      <Filter
        category={category}
        setCategory={setCategory}
      />

      <div className="blog-grid">
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default App;