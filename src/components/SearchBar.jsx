import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material"; // Importa componentes do MUI

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', gap: '10px' }}> {/* Utiliza Box para layout */}
        <TextField
          variant="outlined" // Estilo do TextField
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Buscar fotos"
          fullWidth // Faz o TextField ocupar todo o espaço disponível
        />
        <Button variant="contained" type="submit">Buscar</Button>
      </Box>
    </form>
  );
};

export default SearchBar;

