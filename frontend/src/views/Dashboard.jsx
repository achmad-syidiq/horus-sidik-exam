import React from "react";
import { useAuth } from "../store/useAuth";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) navigate("/login");

  return (
    <Container className="mt-5">
      <h2>Selamat datang, {user?.username}</h2>
      <Button variant="danger" onClick={() => { logout(); navigate("/login"); }}>
        Logout
      </Button>
    </Container>
  );
}
