import React, { useState } from 'react';
import Sidebar from "../../components/Sidebar";
import InputBlock from "./InputBlock";
import { GrConfigure } from "react-icons/gr";

const Config = () => {
    // Estados para armazenar os valores dos campos
    const [model, setModel] = useState("Zangão V");
    const [speed, setSpeed] = useState("30km");
    const [range, setRange] = useState("10km");
    const [flightTime, setFlightTime] = useState("1h");
    const [maxLoad, setMaxLoad] = useState("1kg");
    const [chargeTime, setChargeTime] = useState("1h");

    // Função para lidar com o clique no botão Salvar
    const handleSave = () => {
        // Criar um objeto JSON com os dados dos campos
        const data = {
            model,
            speed,
            range,
            flightTime,
            maxLoad,
            chargeTime,
        };

        // Convertendo o objeto para JSON
        const json = JSON.stringify(data, null, 2);

        console.log(json);
    };

    return (
        <div className="flex flex-row h-screen">
            <Sidebar selected={"configFolder"} />
            <div className="w-full p-8 overflow-auto shadow-xl m-8 rounded-xl">
                <div className="md:justify-between flex-wrap justify-center">
                    <div className="flex gap-4 mt-1 mb-6 ml-12 items-center">
                        <GrConfigure className="w-10 h-10" />
                        <h2 className="text-3xl font-bold">Configurações</h2>
                    </div>
                    <div style={{ display: "flex", gap: '4rem', justifyContent: 'left' }}>
                        <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center" }}>
                            <InputBlock placeholder="Zangão V" titulo="Modelo do Drone:" value={model} onChange={setModel} />
                            <InputBlock placeholder="30km" titulo="Velocidade: " value={speed} onChange={setSpeed} />
                            <InputBlock placeholder="10km" titulo="Alcance: " value={range} onChange={setRange} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: "column" }}>
                            <InputBlock placeholder="1h" titulo="Autonomia de voo: " value={flightTime} onChange={setFlightTime} />
                            <InputBlock placeholder="1kg" titulo="Carga máxima: " value={maxLoad} onChange={setMaxLoad} />
                            <InputBlock placeholder="1h" titulo="Tempo de carga: " value={chargeTime} onChange={setChargeTime} />
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: 'left', marginTop: '4rem' }}>
                        <input
                            className="btn btn-sm btn-primary ml-60"
                            type="submit"
                            value="Salvar"
                            onClick={handleSave}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Config;
