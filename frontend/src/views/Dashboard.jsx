import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Spinner, Button, Alert, Modal } from "react-bootstrap";
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
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Proteksi halaman
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  // Fetch data pengguna
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

  // Tombol edit
  const handleEdit = (userData) => {
    navigate("/update-user", { state: { user: userData } });
  };

  // Tombol hapus -> tampilkan modal
  const handleDeleteClick = (id) => {
    const userToDelete = users.find((u) => u.id === id);
    setSelectedUser(userToDelete);
    setShowModal(true);
  };

  // Konfirmasi hapus
  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/users/${selectedUser.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      setSuccess(`Pengguna "${selectedUser.username}" berhasil dihapus`);
      setShowModal(false);
      setSelectedUser(null);
    } catch {
      setError("Gagal menghapus pengguna");
    }
  };

  // Filter berdasarkan search
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
        style={{ width: "100%", maxWidth: "900px", borderRadius: "12px", backgroundColor: "#fff" }}
      >
        <Card.Body className="p-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-primary">DASHBOARD PENGGUNA</h4>
            <Button variant="outline-secondary" onClick={logout} className="fw-semibold">
              Logout
            </Button>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <SearchBar onSearch={(keyword) => setSearch(keyword)} />

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2 text-muted">Memuat data pengguna...</p>
            </div>
          ) : (
            <UserTable
              users={filteredUsers}
              onEdit={handleEdit}
              onDelete={handleDeleteClick} // kirim id saja
            />
          )}
        </Card.Body>
      </Card>

      {/* Modal konfirmasi hapus */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin menghapus pengguna "{selectedUser?.username}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
