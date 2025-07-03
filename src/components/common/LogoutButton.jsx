export default function LogoutButton({ style = {} }) {
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        float: "right",
        marginBottom: 10,
        background: "#eee",
        border: "1px solid #ccc",
        padding: "6px 16px",
        ...style,
      }}
    >
      Logout
    </button>
  );
}