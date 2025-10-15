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
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <Card
        className="shadow-lg border-0 p-4"
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
        }}
      >
        <Card.Body className="p-3">
          <h3 className="text-center mb-5 fw-bold text-primary">UPDATE USER</h3>

          {message && (
            <Alert 
              variant={message.includes("berhasil") ? "success" : "danger"} 
              className="mb-3"
            >
              {message}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <div className="d-flex align-items-center mb-3">
              <Form.Label className="fw-semibold me-3" style={{ width: "120px", flexShrink: 0 }}>
                Username:
              </Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Masukkan username"
                value={formData.username}
                onChange={handleChange}
                required
                style={{ width: "100%" }}
              />
            </div>

            <div className="d-flex align-items-center mb-3">
              <Form.Label className="fw-semibold me-3" style={{ width: "120px", flexShrink: 0 }}>
                Nama Lengkap:
              </Form.Label>
              <Form.Control
                type="text"
                name="nama"
                placeholder="Masukkan nama lengkap"
                value={formData.nama}
                onChange={handleChange}
                required
                style={{ width: "100%" }}
              />
            </div>

            <div className="d-flex align-items-center mb-4">
              <Form.Label className="fw-semibold me-3" style={{ width: "120px", flexShrink: 0 }}>
                Email:
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Masukkan email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: "100%" }}
              />
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4 ">
                <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="px-4 fw-semibold"
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Update"}
              </Button>
              <Button
                variant="outline-secondary"
                onClick={handleCancel}
                className="px-4 fw-semibold"
                disabled={loading}
              >
                Kembali
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}