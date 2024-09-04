import { LatLngExpression, divIcon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, Polyline } from "react-leaflet";
import { MdLocationPin } from "react-icons/md";
import { renderToStaticMarkup } from "react-dom/server";
import { useState, useEffect } from "react";
import { bairros } from "../data";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { PiDroneBold } from "react-icons/pi";
import { RiSpeedFill } from "react-icons/ri";

export interface MapProps {}

const AddMarkerOnClick = ({ onAddMarker }: { onAddMarker: (cord: LatLngExpression) => void }) => {
  useMapEvents({
    click: (e) => {
      onAddMarker(e.latlng);
    },
  });
  return null;
};

const interpolatePoints = (start: LatLngExpression, end: LatLngExpression, numPoints: number): LatLngExpression[] => {
  const points: LatLngExpression[] = [];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [lat1, lng1] = [start.lat, start.lng];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [lat2, lng2] = [end.lat, end.lng];

  for (let i = 0; i <= numPoints; i++) {
    const ratio = i / numPoints;
    const lat = lat1 + ratio * (lat2 - lat1);
    const lng = lng1 + ratio * (lng2 - lng1);
    points.push([lat, lng] as LatLngExpression);
  }

  return points;
};

const Map: React.FC<MapProps> = () => {
  const [markers, setMarkers] = useState<LatLngExpression[]>([]);
  const [bestRoute, setBestRoute] = useState<LatLngExpression[]>([]);
  const [planePosition, setPlanePosition] = useState<LatLngExpression | null>(null);
  const [speed, setSpeed] = useState<number>(50); // Slider value (0-100) represents speed (higher value = slower speed)

  const iconMarkup = renderToStaticMarkup(
    <MdLocationPin className="fill-primary w-8 h-8 mt-6" />
  );

  const routeMarkup = renderToStaticMarkup(
    <FaLocationCrosshairs className="fill-[#7F658C] w-8 h-8 " />
  );

  const planeMarkup = renderToStaticMarkup(
    <PiDroneBold className="color-slate-500 w-[3rem] h-[3rem] " />
  );

  const customMarkerIcon = divIcon({
    html: iconMarkup,
    iconSize: [50, 50],
    className: "bg-transparent flex justify-center items-center",
  });

  const customRouteMarkupIcon = divIcon({
    html: routeMarkup,
    iconSize: [80, 80],
    className: "bg-transparent flex justify-center items-center",
  });

  const customPlaneIcon = divIcon({
    html: planeMarkup,
    iconSize: [80, 80],
    className: "bg-transparent flex justify-center items-center",
  });

  const calculateRoute = async () => {
    try {
      const response = await fetch('http://localhost:8080/calculate-route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(markers),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const route = data.best_route;

      let newRoute: LatLngExpression[] = [];
      for (let i = 0; i < route.length - 1; i++) {
        newRoute = newRoute.concat(interpolatePoints(route[i], route[i + 1], 80)); // Increase the number of intermediate points
      }
      setBestRoute(newRoute);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddMarker = (cord: LatLngExpression) => {
    setMarkers((prevMarkers) => [...prevMarkers, cord]);
  };

  useEffect(() => {
    if (bestRoute.length > 1) {
      let index = 0;
      const maxSpeed = 100; // Maximum speed value (slider max value)
      const minSpeed = 10;  // Minimum speed value (slider min value)
      const normalizedSpeed = minSpeed + (maxSpeed - speed); // Invert slider value to get the speed

      const interval = setInterval(() => {
        setPlanePosition(bestRoute[index]);
        index = (index + 1) % bestRoute.length;
      }, normalizedSpeed); // Use the normalized speed

      return () => clearInterval(interval);
    }
  }, [bestRoute, speed]); // Depend on speed as well

  const handleClearMarkers = () => {
    setMarkers([]);
    setBestRoute([]);
    setPlanePosition(null);
  };

  return (
    <div className="relative">
      <MapContainer
        center={{ lat: -30.0346, lng: -51.2177 }}
        zoom={13}
        scrollWheelZoom={true}
        className="shadow-2xl rounded-3xl w-full h-[35rem]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {bairros.map((bairro) => {
          const [lat, lng] = bairro.cord.split(",").map(Number);
          return (
            <Marker
              key={bairro.name}
              position={[lat, lng] as LatLngExpression}
              icon={customMarkerIcon}
            >
              <Popup autoClose>{bairro.name}</Popup>
            </Marker>
          );
        })}
        {markers.map((cord, index) => (
          <Marker key={index} position={cord} icon={customRouteMarkupIcon}/>
        ))}
        {bestRoute.length > 0 && planePosition && (
          <Marker position={planePosition} icon={customPlaneIcon}>
            <Popup autoClose>Avião em movimento</Popup>
          </Marker>
        )}
        {bestRoute.length > 0 && (
          <Polyline
            positions={bestRoute}
            color="#7F658C"
            weight={5}
            opacity={0.7}
            dashArray="10, 10"
          />
        )}
        <AddMarkerOnClick onAddMarker={handleAddMarker} />
      </MapContainer>
      <div className="flex gap-2 mt-3 items-center justify-between">
        <div className="flex gap-2">
        <button onClick={handleClearMarkers} className="btn btn-sm btn-primary ">Limpar pontos</button>
        <button onClick={calculateRoute} className="btn btn-sm border-2 border-primary bg-white">Enviar rota</button>
        </div>
        <div className="flex gap-2 items-center">
          <RiSpeedFill/>
          <div className="font-semibold">
            Velocidade de Animação:
          </div>
          <input
            id="speedSlider"
            type="range"
            min="10"
            max="100"
            step="1"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-96 accent-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default Map;