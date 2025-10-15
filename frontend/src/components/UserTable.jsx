import { Table, Button, Badge } from "react-bootstrap";

export default function UserTable({ users, onEdit, onDelete }) {
  if (!users.length) {
    return (
      <div className="text-center py-5">
        <p className="text-muted fs-5">Tidak ada data pengguna.</p>
        <small className="text-muted">Coba gunakan kata kunci pencarian yang berbeda</small>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <Table striped bordered hover className="mb-0">
        <thead className="bg-light">
          <tr>
            <th style={{ width: "80px" }}>ID</th>
            <th style={{ width: "150px" }}>Username</th>
            <th style={{ width: "200px" }}>Nama Lengkap</th>
            <th style={{ width: "250px" }}>Email</th>
            <th style={{ width: "120px" }} className="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <Badge bg="secondary" className="fw-normal">
                  {u.id}
                </Badge>
              </td>
              <td className="fw-semibold">{u.username}</td>
              <td>{u.nama}</td>
              <td>
                <small className="text-muted">{u.email}</small>
              </td>
              <td>
                <div className="d-flex justify-content-center gap-2">
                  <Button
                    size="sm"
                    variant="outline-warning"
                    onClick={() => onEdit(u)}
                    className="fw-semibold"
                    title="Edit User"
                  >
                    U
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => onDelete(u.id)}
                    className="fw-semibold"
                    title="Hapus User"
                  >
                    H
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="mt-3 text-end">
        <small className="text-muted">
          Menampilkan {users.length} pengguna
        </small>
      </div>
    </div>
  );
}