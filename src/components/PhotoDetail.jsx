import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Button, Grid, Typography, Card, CardMedia } from "@mui/material";  // Componentes do Material-UI

const ACCESS_KEY = "XLsiO8w3dDo_v24JrMipEqiHlb6JEH7_Z456DHXNjew";

const PhotoDetail = () => {
  const [photo, setPhoto] = useState(null);
  const [relatedPhotos, setRelatedPhotos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/${id}?client_id=${ACCESS_KEY}`
        );
        const data = await response.json();
        setPhoto(data);

        // Buscar fotos relacionadas
        const relatedResponse = await fetch(
          `https://api.unsplash.com/photos/${id}/related?client_id=${ACCESS_KEY}`
        );
        const relatedData = await relatedResponse.json();
        setRelatedPhotos(relatedData.results);
      } catch (error) {
        console.error("Erro ao buscar detalhes da foto:", error);
      }
    };

    fetchPhotoDetails();
  }, [id]);

  if (!photo) return <Typography>Carregando...</Typography>;

  return (
    <Box sx={{ padding: "20px" }}> {/* Estilizando o layout geral */}
      <Typography variant="h4" gutterBottom>
        Detalhes da Foto
      </Typography>

      {/* Imagem da foto principal */}
      <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
        <img
          src={photo.urls.full}
          alt={photo.description}
          style={{ maxWidth: "100%", borderRadius: "10px" }}
        />
      </Box>

      {/* Descrição e informações da foto */}
      <Typography variant="h6">{photo.description || "Sem descrição"}</Typography>
      <Typography variant="body1">Foto de {photo.user.name} no Unsplash</Typography>
      <Typography variant="body1">Likes: {photo.likes}</Typography>
      <Typography variant="body1">
        Tirado em: {new Date(photo.created_at).toLocaleDateString()}
      </Typography>

      {/* Botão "Voltar" */}
      <Box sx={{ marginTop: '20px' }}>
        <Button variant="contained" color="primary" component={Link} to="/">
          Voltar
        </Button>
      </Box>

      {/* Fotos relacionadas */}
      <Typography variant="h5" sx={{ marginTop: '40px' }}>
        Fotos relacionadas
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: '10px' }}>
        {relatedPhotos.length > 0 ? (
          relatedPhotos.map((relatedPhoto) => (
            <Grid item xs={12} sm={6} md={4} key={relatedPhoto.id}>
              <Card>
                <Link to={`/photos/${relatedPhoto.id}`}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={relatedPhoto.urls.small}
                    alt={relatedPhoto.description || "Foto relacionada"}
                  />
                </Link>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>Nenhuma foto semelhante encontrada.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default PhotoDetail;

