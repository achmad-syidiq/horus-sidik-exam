import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

export default function SearchBar({ onSearch }) {
  const [tempValue, setTempValue] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(tempValue);
  };

  return (
    <InputGroup className="mb-3">
      <Form.Control
        type="text"
        placeholder="Cari berdasarkan nama atau username..."
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
      />
      <Button variant="primary" onClick={handleSearch}>
        Cari
      </Button>
    </InputGroup>
  );
}
