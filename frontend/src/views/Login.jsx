import { useState } from "react";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../store/useAuth";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/users/login", form);
      login(res.data.user, res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Login gagal!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card style={{ width: "400px" }} className="shadow-sm p-4">
        <h3 className="text-center mb-4 fw-bold">LOGIN</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button type="submit" variant="primary" disabled={loading} className="px-4">
              {loading ? <Spinner animation="border" size="sm" /> : "Login"}
            </Button>
            <Button
              variant="outline-secondary"
              type="button"
              className="px-3"
              onClick={() => navigate("/register")}
            >
              Registrasi
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
