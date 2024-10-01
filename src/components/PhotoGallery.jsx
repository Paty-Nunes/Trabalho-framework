import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importa Link
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  Card,
  CardMedia,
} from "@mui/material"; // Importa componentes do MUI

const ACCESS_KEY = "XLsiO8w3dDo_v24JrMipEqiHlb6JEH7_Z456DHXNjew";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null); // Adiciona estado para a foto selecionada

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}`
      );
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error("Erro ao buscar fotos:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${ACCESS_KEY}`
      );
      const data = await response.json();
      setPhotos(data.results || []);
      setHasSearched(data.results.length > 0);
    } catch (error) {
      console.error("Erro ao buscar fotos:", error);
      setPhotos([]);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    fetchPhotos();
    setHasSearched(false);
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <Box sx={{ padding: "20px" }} className="PhotoGallery">
      <Typography variant="h4" gutterBottom>
        Galeria de Fotos
      </Typography>
      <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <TextField
          variant="outlined"
          placeholder="Buscar fotos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1 }} // Faz o TextField ocupar todo o espaço disponível
        />
        <Button variant="contained" type="submit" className="button-search">
          Buscar
        </Button>
        {hasSearched && photos.length > 0 && (
          <Button variant="outlined" onClick={handleReset}>
            Voltar
          </Button>
        )}
      </form>
      <Grid container spacing={2}>
        {photos.length > 0 ? (
          photos.map((photo) => (
            <Grid item xs={12} sm={6} md={4} key={photo.id}>
              <Card onClick={() => openModal(photo)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={photo.urls.small}
                  alt={photo.description}
                />
                <Box sx={{ padding: "10px" }}>
                  <Typography variant="body1">
                    {photo.description || "Sem descrição"}
                  </Typography>
                  <Typography variant="body2">
                    Foto de {photo.user.name} no Unsplash
                  </Typography>
                  <Link to={`/photos/${photo.id}`}>
                    <Button variant="outlined" fullWidth>
                      Ver Detalhes
                    </Button>
                  </Link>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>Nenhuma foto encontrada.</Typography>
            <Button onClick={handleReset} variant="outlined">
              Voltar
            </Button>
          </Grid>
        )}
      </Grid>
      {selectedPhoto && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <img
              src={selectedPhoto.urls.full}
              alt={selectedPhoto.description}
            />
            <p>{selectedPhoto.description || "Sem descrição"}</p>
            <p>Foto de {selectedPhoto.user.name} no Unsplash</p>
          </div>
        </div>
      )}
    </Box>
  );
};

export default PhotoGallery;
