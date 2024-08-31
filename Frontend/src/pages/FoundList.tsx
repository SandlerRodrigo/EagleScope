import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import { mock_data } from "../mock/mock";

const FoundList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fazendo a requisição GET quando o componente é montado
    fetch('http://localhost:8080/get-data')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na requisição'); // Tratamento de erro para respostas não OK
        }
        return response.json(); // Convertendo a resposta para JSON
      })
      .then((data) => {
        console.log(data.data)
        setData(data.data); // Armazenando os dados no estado
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Dependência vazia para garantir que o useEffect seja executado apenas uma vez

  return (
    <div className="flex">
      <Sidebar selected={"list"} />
      <div
        className="grid-container overflow-auto shadow-lg rounded-3xl m-8"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 4rem)",
          backgroundColor: "white",
          padding: "20px",
        }}
      >
        <h1
          className="text-3xl font-bold text-center mb-4 ml-2 self-start"
          style={{ color: "#333" }}
        >
          Pessoas localizadas
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "10px",  // Espaço entre os cards
            justifyContent: "center",  // Centraliza os cards
            overflow: "auto"
          }}
        >
          {data.map((item, index) => (
            <Card
              key={index}
              coordinate={item.coordinate}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoundList;
