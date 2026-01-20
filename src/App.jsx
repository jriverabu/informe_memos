import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, 
  PieChart, Pie 
} from 'recharts';
import { 
  MessageSquare, Instagram, Users, DollarSign, Target, 
  Pizza, LayoutDashboard, List, ArrowUpRight, Award, TrendingUp
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('summary');

  // DATOS REALES AUDITADOS - DICIEMBRE 2025
  const metrics = {
    totalSpend: 828926,
    totalImpacts: 97723,
    whatsappLeads: 121, // 47 conversaciones + 74 clics enlace
    profileVisits: 865,
    engagement: 2021
  };

  const campaigns = [
    { name: "Nuestro favorito por siempre", goal: "Perfil IG", res: 865, spend: 299989, color: "#FACC15" },
    { name: "¿Y tu ya probaste...? (Tráfico)", goal: "Link WhatsApp", res: 74, spend: 23953, color: "#22C55E" },
    { name: "La Navidad sigue sabiendo deliciosa", goal: "Mensaje Directo", res: 23, spend: 152768, color: "#22C55E" },
    { name: "Advertencia: sabe a Navidad", goal: "Mensaje Directo", res: 17, spend: 40943, color: "#22C55E" },
    { name: "Navidad en Combo", goal: "Mensaje Directo", res: 7, spend: 26554, color: "#22C55E" },
  ];

  const MetricCard = ({ title, value, label, icon: Icon, color }) => (
    <div className="bg-white p-5 rounded-[30px] shadow-sm border border-gray-100 flex flex-col justify-between h-40">
      <div className="flex justify-between items-start">
        <div className="p-3 rounded-2xl" style={{ backgroundColor: `${color}15` }}>
          <Icon size={22} style={{ color: color }} />
        </div>
        <span className="text-[10px] font-black text-gray-300 uppercase italic">MEMO'S</span>
      </div>
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 leading-tight">{title}</p>
        <p className="text-2xl font-black text-gray-900 leading-none">{value}</p>
        <p className="text-[9px] font-medium text-gray-400 mt-1 uppercase italic leading-none">{label}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32">
      {/* HEADER */}
      <header className="bg-[#BC0B0B] pt-14 pb-28 px-6 rounded-b-[50px] shadow-2xl relative overflow-hidden text-white text-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="max-w-md mx-auto relative z-10 flex flex-col items-center">
          <div className="bg-white p-2.5 rounded-2xl shadow-xl mb-4">
            <Pizza className="text-[#BC0B0B]" size={32} />
          </div>
          <p className="text-red-100 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Diciembre 2025</p>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">Memo's Pizza</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <MetricCard title="Inversión" value={`$${(metrics.totalSpend / 1000).toFixed(0)}k`} label="Gasto Total" icon={DollarSign} color="#BC0B0B" />
          <MetricCard title="WhatsApp" value={metrics.whatsappLeads} label="Interés Directo" icon={MessageSquare} color="#16A34A" />
          <MetricCard title="Perfil IG" value={metrics.profileVisits} label="Impacto Marca" icon={Instagram} color="#EAB308" />
          <MetricCard title="Alcance" value={`${(metrics.totalImpacts / 1000).toFixed(0)}k`} label="Personas" icon={Users} color="#1F2937" />
        </div>

        <div className="flex bg-white/80 backdrop-blur-lg p-1.5 rounded-[24px] shadow-sm mb-8 border border-gray-100">
          {[
            { id: 'summary', label: 'ANÁLISIS', icon: LayoutDashboard },
            { id: 'detalle', label: 'CAMPAÑAS', icon: List },
            { id: 'estrategia', label: 'PLAN', icon: Target }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center py-3 rounded-2xl transition-all ${
                activeTab === tab.id ? 'bg-[#BC0B0B] text-white shadow-lg' : 'text-gray-400'
              }`}
            >
              <tab.icon size={18} />
              <span className="text-[9px] font-black mt-1 uppercase tracking-widest leading-none">{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'summary' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-50">
              <h3 className="text-xs font-black text-gray-800 uppercase italic mb-6 text-center">Interés Real vs Visibilidad</h3>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'WhatsApp', value: metrics.whatsappLeads },
                        { name: 'Instagram', value: metrics.profileVisits }
                      ]}
                      innerRadius={50} outerRadius={75} paddingAngle={8} dataKey="value"
                    >
                      <Cell fill="#16A34A" />
                      <Cell fill="#FACC15" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-around mt-6 font-black text-[10px] uppercase">
                <div className="text-green-600">WhatsApp: {metrics.whatsappLeads}</div>
                <div className="text-yellow-500">Perfil IG: {metrics.profileVisits}</div>
              </div>
            </div>
            <div className="bg-yellow-400 rounded-[40px] p-8 shadow-xl border-b-8 border-yellow-600">
              <h3 className="text-xl font-black text-red-900 italic mb-2 uppercase italic leading-none">Veredicto</h3>
              <p className="text-red-950 font-bold text-sm leading-relaxed">
                Logramos **121 entradas directas** al negocio vía WhatsApp. 
                <br/><br/>
                La auditoría confirma que la mayoría de los clientes prefieren ver primero el Instagram (865 personas) antes de dar el paso final a la compra.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'detalle' && (
          <div className="space-y-3 animate-in slide-in-from-bottom duration-500">
            {campaigns.map((camp, i) => (
              <div key={i} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center relative overflow-hidden active:scale-95 transition-transform">
                <div className="absolute top-0 left-0 h-full w-1.5" style={{ backgroundColor: camp.color }}></div>
                <div className="flex-1 pr-4 text-left">
                  <span className="text-[8px] font-black text-gray-400 uppercase leading-none">{camp.goal}</span>
                  <h4 className="text-[12px] font-black text-gray-800 uppercase italic leading-tight">{camp.name}</h4>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 justify-end">
                    <p className="text-xl font-black text-gray-900 leading-none">{camp.res}</p>
                    <ArrowUpRight size={14} className="text-gray-300" />
                  </div>
                  <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase italic leading-none">${Math.round(camp.spend/camp.res)} c/u</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'estrategia' && (
          <div className="space-y-4 animate-in zoom-in duration-300">
            <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
              <h3 className="text-2xl font-black italic text-yellow-400 mb-8 uppercase tracking-tighter">Plan de Vuelo</h3>
              <div className="space-y-8">
                <div className="flex gap-4 items-start">
                  <div className="bg-[#BC0B0B] p-3 rounded-2xl"><TrendingUp size={20} color="#FFF" /></div>
                  <div>
                    <h4 className="font-black text-lg italic uppercase leading-none mb-1">Foco en WhatsApp</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">Priorizar el presupuesto en el link de perfil que atrae clientes interesados a bajo costo.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-[#BC0B0B] p-3 rounded-2xl"><Users size={20} color="#FFF" /></div>
                  <div>
                    <h4 className="font-black text-lg italic uppercase leading-none mb-1">Retargeting</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">Impactar a los 865 visitantes de diciembre para convertirlos en ventas de enero.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* NAV INFERIOR */}
      <div className="fixed bottom-0 left-0 right-0 p-6 z-[100] pointer-events-none">
        <div className="max-w-xs mx-auto bg-white/90 backdrop-blur-2xl rounded-full px-8 py-5 flex justify-around shadow-2xl border border-gray-100 pointer-events-auto">
          <button onClick={() => setActiveTab('summary')} className={`transition-all duration-300 ${activeTab === 'summary' ? 'text-[#BC0B0B] scale-125' : 'text-gray-300'}`}>
            <LayoutDashboard size={24} strokeWidth={3} />
          </button>
          <button onClick={() => setActiveTab('detalle')} className={`transition-all duration-300 ${activeTab === 'detalle' ? 'text-[#BC0B0B] scale-125' : 'text-gray-300'}`}>
            <List size={24} strokeWidth={3} />
          </button>
          <button onClick={() => setActiveTab('estrategia')} className={`transition-all duration-300 ${activeTab === 'estrategia' ? 'text-[#BC0B0B] scale-125' : 'text-gray-300'}`}>
            <Target size={24} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
