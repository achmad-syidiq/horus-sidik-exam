import { useState } from "react";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "", email: "", nama: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validasi sisi klien
    if (!form.nama || !form.email || !form.username || !form.password) {
      setError("Semua field wajib diisi!");
      return;
    }
    if (!validateEmail(form.email)) {
      setError("Format email tidak valid!");
      return;
    }

    setLoading(true);
    try {
      await api.post("/users/register", form);
      setSuccess("Registrasi berhasil! Mengarahkan ke halaman login...");
      setTimeout(() => navigate("/login"), 1500); // redirect setelah 1.5 detik
    } catch (err) {
      setError(err.response?.data?.message || "Registrasi gagal!");
    } finally {
      setLoading(false);
    }
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
          maxWidth: "450px",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
        }}
      >
        <Card.Body className="p-3">
          <h3 className="text-center mb-5 fw-bold text-primary">REGISTER</h3>

          {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
          {success && <Alert variant="success" className="mb-3">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <div className="d-flex align-items-center mb-3">
              <Form.Label className="fw-semibold me-3" style={{ width: "100px", flexShrink: 0 }}>
                Nama:
              </Form.Label>
              <Form.Control
                type="text"
                name="nama"
                placeholder="Masukkan nama lengkap"
                value={form.nama}
                onChange={handleChange}
                required
                style={{ width: "100%" }}
              />
            </div>

            <div className="d-flex align-items-center mb-3">
              <Form.Label className="fw-semibold me-3" style={{ width: "100px", flexShrink: 0 }}>
                Email:
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Masukkan email"
                value={form.email}
                onChange={handleChange}
                required
                style={{ width: "100%" }}
              />
            </div>

            <div className="d-flex align-items-center mb-3">
              <Form.Label className="fw-semibold me-3" style={{ width: "100px", flexShrink: 0 }}>
                Username:
              </Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Masukkan username"
                value={form.username}
                onChange={handleChange}
                required
                style={{ width: "100%" }}
              />
            </div>

            <div className="d-flex align-items-center mb-4">
              <Form.Label className="fw-semibold me-3" style={{ width: "100px", flexShrink: 0 }}>
                Password:
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Masukkan password"
                value={form.password}
                onChange={handleChange}
                required
                style={{ width: "100%" }}
              />
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="px-5 fw-semibold"
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Registrasi"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}