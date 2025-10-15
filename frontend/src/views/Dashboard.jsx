import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Spinner, Button, Alert } from "react-bootstrap";
import { useAuth } from "../store/useAuth";
import api from "../services/api";
import SearchBar from "../components/SearchBar";
import UserTable from "../components/UserTable";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout, loading: authLoading } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // proteksi akses halaman dashboard
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  // fetch data user dari API
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("DETAIL ERROR:", err.response?.data || err.message);
        setError("Gagal memuat data pengguna");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // hapus user
  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus user ini?")) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      setError("Gagal menghapus pengguna");
    }
  };

  // edit user (navigasi ke halaman update)
  const handleEdit = (userData) => {
    navigate("/update-user", { state: { user: userData } });
  };

  // filter data berdasarkan search
  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-start vh-100 bg-light py-4"
    >
      <Card
        className="shadow-lg border-0 p-4"
        style={{
          width: "100%",
          maxWidth: "800px",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
        }}
      >
        <Card.Body className="p-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="fw-bold text-primary">DASHBOARD PENGGUNA</h4>
            </div>
            <Button 
              variant="outline-secondary" 
              onClick={logout}
              className="fw-semibold"
            >
              Logout
            </Button>
          </div>

          {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

          <div className="mb-4">
            <SearchBar onSearch={(keyword) => setSearch(keyword)} />
          </div>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2 text-muted">Memuat data pengguna...</p>
            </div>
          ) : (
            <UserTable users={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}