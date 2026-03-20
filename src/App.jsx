import React, { useMemo, useState } from 'react';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { 
  MessageSquare, 
  MousePointer2, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Pizza,
  MapPin,
  Target,
  ChevronRight,
  Printer
} from 'lucide-react';

// Datos extraídos de la imagen proporcionada
const memosPizzaData = [
  { nombre: "Una palabra para ser feliz, PIZZA", resultados: 700, indicador: "Interacciones", costo: 116.67, gasto: 81670, alcance: 13014, impresiones: 32365 },
  { nombre: "Envía este reel, la deuda se cobra con las mejores pizzas", resultados: 41, indicador: "Mensajes a WhatsApp", costo: 2727.61, gasto: 111832, alcance: 10069, impresiones: 16597 },
  { nombre: "Storytime de cuando un cliente devolvió una pizza", resultados: 87, indicador: "Mensajes a WhatsApp", costo: 2413.76, gasto: 209997, alcance: 15214, impresiones: 30602 },
  { nombre: "Sabemos que es una difícil decisión. Todos tus favoritos", resultados: 1080, indicador: "Interacciones", costo: 138.81, gasto: 149915, alcance: 11177, impresiones: 40881 },
  { nombre: "Este San Valentín se celebra con pizza", resultados: 26, indicador: "Mensajes a WhatsApp", costo: 3435.88, gasto: 89333, alcance: 9657, impresiones: 15773 },
  { nombre: "La cena perfecta sí existe", resultados: 488, indicador: "Interacciones", costo: 102.47, gasto: 50005, alcance: 7491, impresiones: 14217 },
  { nombre: "Una pizza no te quita la tristeza", resultados: 36, indicador: "Mensajes a WhatsApp", costo: 2828.92, gasto: 101841, alcance: 11634, impresiones: 19264 },
  { nombre: "No tenías hambre... pero el destino tenía otros planes", resultados: 350, indicador: "Visitas al Perfil", costo: 215.89, gasto: 75560, alcance: 13371, impresiones: 19739 },
];

const COLORS = ['#e11d48', '#f59e0b', '#7c2d12', '#ea580c'];

const StatCard = ({ title, value, subValue, icon: Icon, colorClass }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-rose-200 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${colorClass}`}>
        <Icon size={24} className="text-white" />
      </div>
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global</span>
    </div>
    <h3 className="text-slate-500 text-xs font-bold uppercase mb-1">{title}</h3>
    <div className="flex items-baseline gap-2">
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </div>
    <p className="text-[11px] text-slate-400 mt-2 font-medium">{subValue}</p>
  </div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = useMemo(() => {
    const totals = memosPizzaData.reduce((acc, curr) => {
      acc.gasto += curr.gasto;
      acc.alcance += curr.alcance;
      acc.impresiones += curr.impresiones;
      
      if (curr.indicador === "Mensajes a WhatsApp") acc.mensajes += curr.resultados;
      if (curr.indicador === "Interacciones") acc.interacciones += curr.resultados;
      if (curr.indicador === "Visitas al Perfil") acc.visitas += curr.resultados;
      
      return acc;
    }, { gasto: 0, alcance: 0, impresiones: 0, mensajes: 0, interacciones: 0, visitas: 0 });

    return totals;
  }, []);

  const chartData = useMemo(() => {
    return [
      { name: 'WhatsApp', value: stats.mensajes, gasto: memosPizzaData.filter(i => i.indicador.includes('WhatsApp')).reduce((a,b) => a + b.gasto, 0) },
      { name: 'Interacciones', value: stats.interacciones, gasto: memosPizzaData.filter(i => i.indicador === 'Interacciones').reduce((a,b) => a + b.gasto, 0) },
      { name: 'Visitas', value: stats.visitas, gasto: memosPizzaData.filter(i => i.indicador.includes('Visitas')).reduce((a,b) => a + b.gasto, 0) },
    ];
  }, [stats]);

  const formatCurrency = (val) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
  const formatNum = (val) => new Intl.NumberFormat('es-CO').format(val);

  // Función para manejar la exportación a PDF (vía Impresión)
  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900 pb-12 print:bg-white print:pb-0">
      {/* Top Navigation / Brand */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 print:relative print:border-none">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-rose-600 p-2.5 rounded-xl shadow-lg shadow-rose-200 print:shadow-none">
              <Pizza className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-900">Memos Pizza</h1>
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                <MapPin size={10} className="text-rose-500" />
                <span>Cúcuta, Norte de Santander</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 print:hidden">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'overview' ? 'bg-white shadow-sm text-rose-600' : 'text-slate-500'}`}
            >
              Vista General
            </button>
            <button 
              onClick={() => setActiveTab('campaigns')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'campaigns' ? 'bg-white shadow-sm text-rose-600' : 'text-slate-500'}`}
            >
              Campañas
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 mt-8">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 print:grid-cols-4">
          <StatCard 
            title="Inversión Total" 
            value={formatCurrency(stats.gasto)}
            subValue="Presupuesto ejecutado"
            icon={DollarSign}
            colorClass="bg-rose-600"
          />
          <StatCard 
            title="Conversiones (WA)" 
            value={formatNum(stats.mensajes)}
            subValue={`Costo/Msg: ${formatCurrency(stats.gasto / stats.mensajes)}`}
            icon={MessageSquare}
            colorClass="bg-emerald-500"
          />
          <StatCard 
            title="Interacciones" 
            value={formatNum(stats.interacciones)}
            subValue="Likes, comments, shares"
            icon={MousePointer2}
            colorClass="bg-blue-500"
          />
          <StatCard 
            title="Alcance Total" 
            value={formatNum(stats.alcance)}
            subValue={`${formatNum(stats.impresiones)} impresiones`}
            icon={Users}
            colorClass="bg-amber-500"
          />
        </div>

        {activeTab === 'overview' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Chart */}
            <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 print:shadow-none print:border">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-black text-slate-800 flex items-center gap-2">
                  <TrendingUp className="text-rose-600" size={20} />
                  Resultados por Categoría
                </h3>
              </div>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                    <Tooltip 
                      cursor={{ fill: '#fff1f2' }}
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Distribution Chart */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 print:shadow-none print:border">
              <h3 className="font-black text-slate-800 mb-8 flex items-center gap-2">
                <Target className="text-rose-600" size={20} />
                Distribución de Gasto
              </h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={8}
                      dataKey="gasto"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 space-y-3">
                {chartData.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                      <span className="text-xs font-bold text-slate-500">{item.name}</span>
                    </div>
                    <span className="text-xs font-black text-slate-700">{formatCurrency(item.gasto)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden print:border print:shadow-none">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Campaña</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Indicador</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Resultados</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Costo Unit.</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Inversión</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {memosPizzaData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-rose-50/30 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-800 group-hover:text-rose-700 transition-colors">{item.nombre}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-tighter ${
                          item.indicador.includes('WhatsApp') ? 'bg-emerald-100 text-emerald-700' : 
                          item.indicador.includes('Interacciones') ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {item.indicador}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right font-black text-slate-900">{formatNum(item.resultados)}</td>
                      <td className="px-8 py-5 text-right font-bold text-slate-500 text-xs">{formatCurrency(item.costo)}</td>
                      <td className="px-8 py-5 text-right">
                        <span className="text-sm font-black text-slate-800">{formatCurrency(item.gasto)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Action Footer - Hidden on print */}
        <div className="mt-10 bg-rose-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-rose-200 print:hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div>
              <h2 className="text-3xl font-black mb-2 tracking-tighter">Resumen Estratégico</h2>
              <p className="text-rose-100 text-sm max-w-md font-medium">
                Las campañas de Interacciones están logrando el costo más bajo por resultado, mientras que el contenido de Storytime impulsa las conversiones directas por WhatsApp.
              </p>
            </div>
            <button 
              onClick={handleExportPDF}
              className="bg-white text-rose-600 px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2 hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-rose-900/20"
            >
              <Printer size={18} />
              Exportar a PDF
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-rose-500/50 rounded-full blur-2xl"></div>
        </div>

        {/* Print Only Disclaimer */}
        <div className="hidden print:block mt-12 pt-8 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Reporte Generado Automáticamente por Sistema de Marketing - Memos Pizza Cúcuta</p>
        </div>
      </main>
    </div>
  );
};

export default App;
