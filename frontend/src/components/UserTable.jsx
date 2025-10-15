import { Table, Button } from "react-bootstrap";

export default function UserTable({ users, onEdit, onDelete }) {
  if (!users.length) {
    return <p className="text-center text-muted">Tidak ada data pengguna.</p>;
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Nama</th>
          <th>Email</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.username}</td>
            <td>{u.nama}</td>
            <td>{u.email}</td>
            <td>
              <Button
                size="sm"
                variant="warning"
                className="me-2"
                onClick={() => onEdit(u)}
              >
                U
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(u.id)}
              >
                H
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
