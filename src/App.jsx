import React, { useState, useMemo } from 'react';
import { 
  BarChart, 
  Users, 
  MessageCircle, 
  MousePointer2, 
  TrendingUp, 
  DollarSign, 
  Eye, 
  Filter,
  Pizza
} from 'lucide-react';

const App = () => {
  // Datos extraídos de la imagen de la campaña
  const campaignData = [
    { name: "Una pizza no te quita la tristeza", results: 25, type: "Mensajes a WhatsApp", costPerResult: 3385.16, spent: 84629, impressions: 16141, reach: 10259 },
    { name: "No tenías hambre... pero el destino tenía otros planes", results: 235, type: "Visitas al Perfil", costPerResult: 257.35, spent: 60478, impressions: 18610, reach: 13916 },
    { name: "Y si es viernes... ya sabes qué toca.", results: 2, type: "Mensajes a WhatsApp", costPerResult: 1395, spent: 2790, impressions: 318, reach: 291 },
    { name: "Así se ve la cena perfecta", results: 1, type: "Mensajes a WhatsApp", costPerResult: 2122, spent: 2122, impressions: 316, reach: 278 },
    { name: "POV: los cumpleaños en Cúcuta ya no son lo mismo...", results: 36, type: "Mensajes a WhatsApp", costPerResult: 4165.97, spent: 149975, impressions: 25309, reach: 12188 },
    { name: "Las mejores pizzas", results: 1544, type: "Interacciones", costPerResult: 97.15, spent: 149998, impressions: 48112, reach: 16017 },
    { name: "4 pizzas, 4 sabores, un solo plan", results: 84, type: "Mensajes a WhatsApp", costPerResult: 1769.37, spent: 148627, impressions: 37666, reach: 20144 },
    { name: "Abril sabe mejor en familia", results: 40, type: "Mensajes a WhatsApp", costPerResult: 3749.97, spent: 149999, impressions: 28823, reach: 12013 },
    { name: "Nos atrevemos a decir que la fórmula...", results: 1604, type: "Interacciones", costPerResult: 93.47, spent: 149934, impressions: 47321, reach: 14660 }
  ];

  // Cálculos de Totales
  const totals = useMemo(() => {
    return campaignData.reduce((acc, curr) => {
      acc.spent += curr.spent;
      acc.impressions += curr.impressions;
      acc.reach += curr.reach;
      if (curr.type === "Mensajes a WhatsApp") acc.whatsapp += curr.results;
      if (curr.type === "Visitas al Perfil") acc.visits += curr.results;
      if (curr.type === "Interacciones") acc.interactions += curr.results;
      return acc;
    }, { spent: 0, impressions: 0, reach: 0, whatsapp: 0, visits: 0, interactions: 0 });
  }, []);

  const formatCurrency = (val) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
  const formatNumber = (val) => new Intl.NumberFormat('es-CO').format(val);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-orange-600 p-3 rounded-2xl shadow-lg shadow-orange-200">
            <Pizza className="text-white w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">Memos Pizza</h1>
            <p className="text-slate-500 font-medium uppercase text-xs tracking-widest">Informe General de Rendimiento</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-slate-600 italic">Datos en tiempo real</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-6">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card 
            title="Inversión Total" 
            value={formatCurrency(totals.spent)} 
            icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
            color="bg-emerald-50"
          />
          <Card 
            title="Alcance Total" 
            value={formatNumber(totals.reach)} 
            icon={<Users className="w-5 h-5 text-blue-600" />}
            color="bg-blue-50"
          />
          <Card 
            title="Impresiones" 
            value={formatNumber(totals.impressions)} 
            icon={<Eye className="w-5 h-5 text-purple-600" />}
            color="bg-purple-50"
          />
          <Card 
            title="Costo Prom. Mensaje" 
            value={formatCurrency(totals.spent / (totals.whatsapp || 1))} 
            icon={<TrendingUp className="w-5 h-5 text-orange-600" />}
            color="bg-orange-50"
          />
        </div>

        {/* Breakdown Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <BreakdownCard 
            title="WhatsApp" 
            count={totals.whatsapp} 
            subtitle="Mensajes directos"
            icon={<MessageCircle className="w-6 h-6 text-green-600" />}
            accent="bg-green-600"
          />
          <BreakdownCard 
            title="Interacciones" 
            count={totals.interactions} 
            subtitle="Likes, shares, comments"
            icon={<BarChart className="w-6 h-6 text-sky-600" />}
            accent="bg-sky-600"
          />
          <BreakdownCard 
            title="Visitas Perfil" 
            count={totals.visits} 
            subtitle="Interés en la marca"
            icon={<MousePointer2 className="w-6 h-6 text-rose-600" />}
            accent="bg-rose-600"
          />
        </div>

        {/* Detailed Table */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <Filter className="w-4 h-4 text-orange-500" />
              Desglose de Campañas
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                  <th className="px-6 py-4">Campaña</th>
                  <th className="px-6 py-4 text-center">Resultados</th>
                  <th className="px-6 py-4 text-center">Tipo</th>
                  <th className="px-6 py-4 text-right">Costo/Res</th>
                  <th className="px-6 py-4 text-right">Gasto</th>
                  <th className="px-6 py-4 text-right">Alcance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {campaignData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors group text-sm">
                    <td className="px-6 py-4 font-semibold text-slate-700 max-w-xs truncate group-hover:text-orange-600 transition-colors">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-3 py-1 bg-slate-100 rounded-full font-bold text-slate-800">
                        {formatNumber(item.results)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        item.type.includes('WhatsApp') ? 'text-green-600 bg-green-50' : 
                        item.type.includes('Perfil') ? 'text-rose-600 bg-rose-50' : 'text-sky-600 bg-sky-50'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-600 font-medium">
                      {formatCurrency(item.costPerResult)}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-slate-800">
                      {formatCurrency(item.spent)}
                    </td>
                    <td className="px-6 py-4 text-right text-slate-500">
                      {formatNumber(item.reach)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Visualization */}
        <div className="bg-slate-800 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-md text-center md:text-left">
            <h3 className="text-3xl font-bold leading-tight">Métricas Consolidadas</h3>
            <p className="text-slate-400">Resumen ejecutivo del tráfico pagado para la marca. El foco principal es la conversión directa a través de canales de mensajería.</p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
              <div className="bg-slate-700/50 px-4 py-2 rounded-2xl border border-slate-600/50">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">CTR Estimado</p>
                <p className="text-xl font-bold">{(totals.reach / totals.impressions * 100).toFixed(1)}%</p>
              </div>
              <div className="bg-slate-700/50 px-4 py-2 rounded-2xl border border-slate-600/50">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Freq. Promedio</p>
                <p className="text-xl font-bold">{(totals.impressions / totals.reach).toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-auto flex flex-col gap-3">
             <ProgressBar label="WhatsApp" current={totals.whatsapp} max={4000} color="bg-green-500" />
             <ProgressBar label="Interacciones" current={totals.interactions} max={4000} color="bg-sky-500" />
             <ProgressBar label="Visitas Perfil" current={totals.visits} max={4000} color="bg-rose-500" />
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto mt-12 mb-8 text-center border-t border-slate-200 pt-8">
        <p className="text-slate-400 text-sm font-medium">
          Reporte Generado para <span className="text-slate-600 font-bold uppercase">Memos Pizza</span> • Analista Trafficker Expert
        </p>
      </footer>
    </div>
  );
};

const Card = ({ title, value, icon, color }) => (
  <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className={`p-3 rounded-2xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</p>
      <p className="text-xl font-extrabold text-slate-800 tracking-tight">{value}</p>
    </div>
  </div>
);

const BreakdownCard = ({ title, count, subtitle, icon, accent }) => (
  <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between group hover:border-slate-300 transition-all overflow-hidden relative">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-5 rounded-full ${accent}`}></div>
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-white transition-colors">
        {icon}
      </div>
    </div>
    <div>
      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{title}</h3>
      <p className="text-4xl font-black text-slate-800 my-1">{new Intl.NumberFormat('es-CO').format(count)}</p>
      <p className="text-slate-500 text-sm italic">{subtitle}</p>
    </div>
  </div>
);

const ProgressBar = ({ label, current, max, color }) => {
  const percentage = Math.min((current / max) * 100, 100);
  return (
    <div className="min-w-[240px] space-y-2">
      <div className="flex justify-between text-xs font-bold tracking-widest uppercase">
        <span className="text-slate-300">{label}</span>
        <span>{new Intl.NumberFormat('es-CO').format(current)}</span>
      </div>
      <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default App;
