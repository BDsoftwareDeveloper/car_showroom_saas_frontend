function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", content: "", image_url: "" });
  const token = localStorage.getItem("admin_token");

  const fetchBlogs = async () => {
    const res = await fetch("/api/admin/blogs", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setBlogs(data);
  };

  const addBlog = async () => {
    await fetch("/api/admin/blogs", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlog),
    });
    setNewBlog({ title: "", content: "", image_url: "" });
    fetchBlogs();
  };

  const deleteBlog = async (id) => {
    await fetch(`/api/admin/blogs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-6 max-w-xl space-y-4">
      <h2 className="text-xl font-bold">📰 Manage Blog Posts</h2>
      <input placeholder="Title" value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} />
      <textarea placeholder="Content" value={newBlog.content} onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })} />
      <input placeholder="Image URL (optional)" value={newBlog.image_url} onChange={(e) => setNewBlog({ ...newBlog, image_url: e.target.value })} />
      <button className="bg-blue-600 text-white px-4 py-1" onClick={addBlog}>Add</button>

      <ul className="space-y-2">
        {blogs.map((b) => (
          <li key={b.id} className="border p-2 rounded">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{b.title}</p>
                <p className="text-xs">{b.content.slice(0, 60)}...</p>
              </div>
              <button onClick={() => deleteBlog(b.id)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
