
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

export default function Graph3() {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches); 
    const handleResize = () => setIsMobile(mediaQuery.matches); 
    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize); 
  }, []);

  const data_coluna_pessoas_localizadas = [
    { data: 'Centro Histórico', num: 5 },
    { data: 'Bom Fim', num: 8 },
    { data: 'Cidade Baixa', num: 1 },
    { data: 'Moinhos de Vento', num: 3 },
    { data: 'Menino Deus', num: 7 },
    { data: 'Partenon', num: 2 },
    { data: 'Santana', num: 8 },
    { data: 'São Geraldo', num: 5 },
    { data: 'São João', num: 11 },
    { data: 'São Sebastião', num: 13 },
    { data: 'Vila Assunção', num: 21 }
  ];

  return (
    <ResponsiveContainer width="100%" height={390}>
      <BarChart
        style={{ marginTop: "2rem" }}
        data={data_coluna_pessoas_localizadas}
        margin={{ top: 20, right: 30, bottom: 80, left: 20 }} // Adiciona margem ao redor do gráfico
      >
        <CartesianGrid vertical={false} stroke="#ECECEC" />
        <XAxis
          tickMargin={15}
          tickLine={false}
          axisLine={false}
          dataKey="data"
          interval={0}
          angle={-30}
          textAnchor="end"
          tick={!isMobile}
          dy={10} // Ajusta a distância vertical das labels do eixo X
        />
        <YAxis tickMargin={15} />
        <Tooltip 
          formatter={(value) => [`${value} pessoas`, 'Bairro']} 
          labelFormatter={(label) => `Bairro: ${label}`}  
        />
        <Bar
          dataKey="num"
          fill="#8E6F8E"
          maxBarSize={30}
          radius={[7.5, 7.5, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
