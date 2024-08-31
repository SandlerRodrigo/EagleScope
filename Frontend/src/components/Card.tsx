import React from "react";
import { IoMdPin } from "react-icons/io";
import { FaClock } from "react-icons/fa6";


export interface CardProps {
  coordinate: string;
  image: string;
  bairro: string;
  time: string;
}

const Card: React.FC<CardProps> = ({ coordinate, image, bairro, time }) => {
  return (
    <div className="card flex-1" style={{
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width:"100%",
      maxWidth: "400px", // Ajuste o tamanho máximo
      minWidth: "300px", // Ajuste o tamanho mínimo
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
      <div className="flex justify-between items-center w-full mx-4 mt-4">
      <div className="flex gap-2 items-center">
        <IoMdPin size={"2rem"}/>
        <div className="font-bold text-xl">
          {bairro}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <FaClock size={"1.6rem"}/>
        <div className="font-bold text-xl">
          {time}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Card;
