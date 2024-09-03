import 'leaflet/dist/leaflet.css';
import Sidebar from "../../components/Sidebar";
import Map from "./components/Map";
import Graph1 from "./components/graphs/Graph1";
import Graph2 from "./components/graphs/Graph2";
import Graph3 from "./components/graphs/Graph3";
import { PiAirplaneTiltFill } from "react-icons/pi";




const RoutePlanner = () => {

  return (
    <div className="flex flex-row h-screen pt-8 md:pt-0">
      <Sidebar selected={"foundList"} />
      <div className="w-full pt-8 md:pt-8 p-0 md:p-8 overflow-auto  shadow-xl m-0 md:m-8 rounded-xl ">
        <div className="flex gap-4 mt-1 mb-6 ml-12 items-center">
          <PiAirplaneTiltFill className="w-10 h-10"/>
        <h2 className="text-3xl font-bold">Criar Rotas de Voo</h2>
        </div>
        <div className="mt-8 rounded-3xl shaodw-2xl overflow-hidden px-5 md:px-10 flex flex-col justify-center">
          <Map  />
          <div className="bg-white rounded-3xl h-full p-8 shadow-md  mt-8">
          <h2 className="text-3xl  font-semibold">Pedidos de socorro por Bairro</h2>
          <Graph1/>
          </div>
          <div className="flex gap-6 flex-wrap md:flex-nowrap">
            <div className="bg-white w-full md:w-1/3 rounded-3xl h-full p-8 shadow-md  mt-8">
              <h2 className="text-3xl  font-semibold">Bairros Afetados</h2>
              <Graph2/>
            </div>
            <div className="bg-white w-full md:w-2/3 rounded-3xl h-full p-8 shadow-md  mt-8">
              <h2 className="text-3xl  font-semibold">Pessoas resgatadas por Bairro</h2>
              <Graph3/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoutePlanner