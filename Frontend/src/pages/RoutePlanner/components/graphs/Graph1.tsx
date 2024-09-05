
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { collaborators_data } from "../../data";

export default function Graph1() {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);  // Inicializa o estado com base na consulta de mídia
    const handleResize = () => setIsMobile(mediaQuery.matches);  // Atualiza o estado ao redimensionar
    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);  // Limpa o evento ao desmontar
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart style={{ marginTop: "2rem" }} data={collaborators_data}>
        <CartesianGrid vertical={false} stroke="#ECECEC" />
        <XAxis
          tickMargin={15}
          tickLine={false}
          axisLine={false}
          dataKey="bairro"
          interval={0}
          textAnchor="end"
          tick={!isMobile}
        />
        <YAxis tickMargin={15}
         />
        <Tooltip 
          formatter={(value, name) => [`${value}`, name]}  // Personalize a formatação dos valores e labels do tooltip
          labelFormatter={(label) => `Bairro: ${label}`}  // Personalize a label do eixo X no tooltip
        />
        <Bar
          dataKey="pedidos"
          fill="#4D3146"
          maxBarSize={30}
          radius={[7.5, 7.5, 7.5, 7.5]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
