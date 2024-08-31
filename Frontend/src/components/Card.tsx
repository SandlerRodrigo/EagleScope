import React from "react";

export interface CardProps {
  coordinate: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ coordinate, image }) => {
  return (
    <div className="card flex-1" style={{
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width:"100%",
      maxWidth: "400px", // Ajuste o tamanho máximo
      minWidth: "350px", // Ajuste o tamanho mínimo
      backgroundColor: "white",
      boxShadow: "0 6px 8px rgba(0, 0, 0, 0.1)",
      margin: "10px",
      borderRadius: "10px",
      boxSizing: "border-box" // Inclui padding e border no cálculo do width/height
    }}>
      <div className="coordinate" style={{
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginBottom: "10px",
      }}>
        {coordinate}
      </div>
      <img src={image} alt="Coordinate visual" className="image" style={{
        width: "100%",
        height: "auto", // Ajuste a altura para manter a proporção da imagem
        borderRadius: "10px",
      }} />
    </div>
  );
};

export default Card;
