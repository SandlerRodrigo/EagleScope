import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

// Reformule o conjunto de dados para o formato esperado pelo `PieChart`
const data_pizza1 = [
  { name: 'Bairros Afetados', value: 61 },
  { name: 'Bairros não Afetados', value: 19 },
];

const COLORS = ['#6A4D69', '#7F658C']; // Cores para os setores do gráfico

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={420} style={{ marginTop: 0 }}> 
        <PieChart>
          <Pie
            data={data_pizza1}
            cx="50%" // Centraliza no eixo X
            cy="50%" // Centraliza no eixo Y
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150} // Raio externo aumentado
            fill="#8884d8"
            dataKey="value"
          >
            {data_pizza1.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          {/* Adicionando a legenda */}
          <Legend 
            verticalAlign="bottom" // Alinhamento vertical na parte inferior
            height={40} // Ajuste a altura da legenda
            iconType="circle" // Tipo de ícone para a legenda (círculo, linha, quadrado, etc.)
            layout="horizontal" // Alinha a legenda horizontalmente
            wrapperStyle={{ marginTop: -20 }} // Ajusta o espaçamento entre o gráfico e a legenda
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
