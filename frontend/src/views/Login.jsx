import { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../store/useAuth";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/users/login", form);
      login(res.data.user, res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Username atau password salah");
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
          <h3 className="text-center mb-5 fw-bold text-primary">LOGIN</h3>

          {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
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
                className="px-4 fw-semibold"
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Login"}
              </Button>
              <Button
                variant="outline-secondary"
                type="button"
                className="px-4 fw-semibold"
                onClick={() => navigate("/register")}
              >
                Registrasi
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}