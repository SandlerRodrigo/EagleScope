import Sidebar from "../../components/Sidebar"
import InputBlock from "./InputBlock"


const config = () => {
    return (
        <div className="flex flex-row h-screen">
            <Sidebar selected={""} />
            <div className="w-full p-8 overflow-auto  shadow-xl m-8 rounded-xl ">
                <div style={{display: 'flex', flexDirection: 'column', justifyContent:'left', width: '30rem'}}>
                    <div style={{ display: 'flex', justifyContent: 'left' }}>
                        <h1 className="text-3xl font-bold mt-1 mb-6 ">Configurações do Drone</h1>
                    </div>
                    <div style={{ display: "flex", gap: '4rem', justifyContent: 'left' }}>
                        <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center" }}>
                            <InputBlock placeholder="Zangão V" titulo="Modelo do Drone:" />
                            <InputBlock placeholder="30km" titulo="Velocidade: " />
                            <InputBlock placeholder="10km" titulo="Alcance: " />
                        </div>
                        <div style={{ display: 'flex', flexDirection: "column" }}>
                            <InputBlock placeholder="1h" titulo="Autonomia de voo: " />
                            <InputBlock placeholder="1kg" titulo="Carga máxima: " />
                            <InputBlock placeholder="1h" titulo="Tempo de carga: " />
                        </div>
                    </div>
                    <div style={{display: "flex", justifyContent: 'center', marginTop: '4rem', scale: '1.4'}}>
                        <input className="btn btn-sm btn-primary  mb-4" type="submit" value="Salvar" onClick={() => window.alert('D9D9D9')} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default config