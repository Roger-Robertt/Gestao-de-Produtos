import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Relatorios() {
  // Dados que viriam da sua API
  const dados = [
    { mes: 'Jan', vendas: 4000 },
    { mes: 'Fev', vendas: 3000 },
    { mes: 'Mar', vendas: 2000 },
  ];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={dados}>
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="vendas" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Relatorios;