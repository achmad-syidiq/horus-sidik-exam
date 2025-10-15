import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import api from "../services/api";

export default function UpdateUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.user; 

  const [formData, setFormData] = useState({
    username: "",
    nama: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userData) {
      navigate("/dashboard");
      return;
    }
    setFormData({
      username: userData.username || "",
      nama: userData.nama || "",
      email: userData.email || "",
    });
  }, [userData, navigate]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      await api.put(`/users/${userData.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Data pengguna berhasil diperbarui!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch {
      setMessage("Gagal memperbarui data pengguna.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <h4 className="mb-3">Update Pengguna</h4>

        {message && <Alert variant={message.includes("berhasil") ? "success" : "danger"}>{message}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nama Lengkap</Form.Label>
            <Form.Control
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handleCancel}>
              Kembali
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Update"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
