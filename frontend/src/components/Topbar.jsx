import useAuth from "../context/useAuth";
import useBusinessMode from "../context/useBusinessMode";

function Topbar() {
  const { user, logout } = useAuth();
  const { mode, toggleMode } = useBusinessMode();

  return (
    <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">{user?.storeName} Dashboard</h1>

      <div className="flex items-center gap-6">
        {/* Mode Toggle */}
        <button
          onClick={toggleMode}
          className={`px-4 py-1 rounded text-white ${
            mode === "retail" ? "bg-blue-500" : "bg-purple-600"
          }`}
        >
          {mode === "retail" ? "Retail Mode" : "Wholesale Mode"}
        </button>

        <span className="text-gray-600">{user?.name}</span>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Topbar;
