import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

export default function SearchBar({ onSearch }) {
  const [tempValue, setTempValue] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(tempValue);
  };

  return (
    <InputGroup className="mb-3" style={{ maxWidth: "100%" }}>
      <Form.Control
        type="text"
        placeholder="Cari berdasarkan nama atau username..."
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        className="border-end-0"
      />
      <Button 
        variant="primary" 
        onClick={handleSearch}
        className="fw-semibold"
      >
        Cari
      </Button>
    </InputGroup>
  );
}