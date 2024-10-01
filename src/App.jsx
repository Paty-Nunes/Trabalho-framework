import PhotoGallery from "./components/PhotoGallery";
import PhotoDetail from "./components/PhotoDetail";
import { Box } from "@mui/material"; // Importando apenas Box do MUI
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Certifique-se de importar Router, Routes e Route
import "./App.css";

function App() {
  return (
    <Router>
      <Box className="App">
        {/* Conteúdo das rotas */}
        <Box sx={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<PhotoGallery />} />
            <Route path="/photos/:id" element={<PhotoDetail />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;



