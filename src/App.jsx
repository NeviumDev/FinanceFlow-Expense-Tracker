import React, { useState, useMemo } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, DollarSign, Calendar, Filter, Plus, Trash2, ArrowUpRight } from 'lucide-react';

// ============ COMPONENTE: Header Hero ============
const Header = ({ totalBalance, totalExpenses, percentChange }) => (
  <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8 rounded-2xl shadow-2xl border border-purple-500/20">
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>
    
    <div className="relative z-10">
      <div className="mb-8">
        <h1 className="text-5xl font-black mb-2 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
          FinanceFlow
        </h1>
        <p className="text-purple-200 text-lg">Gestión inteligente de tus finanzas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500/30 to-cyan-500/20 backdrop-blur-xl p-6 rounded-xl border border-cyan-400/30 hover:border-cyan-300/60 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20">
          <div className="relative z-10">
            <p className="text-cyan-200 text-sm font-semibold mb-2">Balance Total</p>
            <p className="text-4xl font-black text-white mb-2">${totalBalance.toLocaleString()}</p>
            <p className="text-cyan-300 text-xs">Disponible para gastar</p>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-red-500/30 to-orange-500/20 backdrop-blur-xl p-6 rounded-xl border border-orange-400/30 hover:border-orange-300/60 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20">
          <div className="relative z-10">
            <p className="text-orange-200 text-sm font-semibold mb-2">Gastos Este Mes</p>
            <p className="text-4xl font-black text-white mb-2">${totalExpenses.toLocaleString()}</p>
            <div className="flex items-center gap-1">
              <ArrowUpRight size={16} className="text-red-400" />
              <span className="text-red-300 text-xs">{percentChange}% vs mes anterior</span>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-500/30 to-green-500/20 backdrop-blur-xl p-6 rounded-xl border border-emerald-400/30 hover:border-emerald-300/60 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20">
          <div className="relative z-10">
            <p className="text-emerald-200 text-sm font-semibold mb-2">Disponible</p>
            <p className="text-4xl font-black text-white mb-2">${(totalBalance - totalExpenses).toLocaleString()}</p>
            <p className="text-emerald-300 text-xs">Presupuesto restante</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ============ COMPONENTE: Formulario Premium ============
const ExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Alimentación',
    date: new Date().toISOString().split('T')[0],
  });
  const [focused, setFocused] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) {
      alert('Completa todos los campos');
      return;
    }
    onAddExpense({
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount)
    });
    setFormData({
      description: '',
      amount: '',
      category: 'Alimentación',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const categories = [
    { name: 'Alimentación', color: 'from-orange-400 to-red-500', icon: '🍔' },
    { name: 'Transporte', color: 'from-blue-400 to-cyan-500', icon: '🚗' },
    { name: 'Entretenimiento', color: 'from-purple-400 to-pink-500', icon: '🎮' },
    { name: 'Salud', color: 'from-green-400 to-emerald-500', icon: '⚕️' },
    { name: 'Educación', color: 'from-indigo-400 to-purple-500', icon: '📚' },
    { name: 'Otros', color: 'from-gray-400 to-slate-500', icon: '📦' },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-700/50 backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-6">
        <Plus size={24} className="text-blue-400" />
        <h2 className="text-2xl font-black text-white">Nuevo Gasto</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Descripción</label>
          <input
            type="text"
            placeholder="Ej: Almuerzo en restaurante"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            onFocus={() => setFocused('desc')}
            onBlur={() => setFocused(null)}
            className={`w-full bg-slate-700/50 border-2 rounded-lg px-4 py-3 text-white placeholder-slate-400 transition-all ${
              focused === 'desc' ? 'border-blue-400 shadow-lg shadow-blue-400/20' : 'border-slate-600 hover:border-slate-500'
            }`}
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Monto ($)</label>
          <input
            type="number"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
            onFocus={() => setFocused('amount')}
            onBlur={() => setFocused(null)}
            step="0.01"
            min="0"
            className={`w-full bg-slate-700/50 border-2 rounded-lg px-4 py-3 text-white placeholder-slate-400 transition-all ${
              focused === 'amount' ? 'border-green-400 shadow-lg shadow-green-400/20' : 'border-slate-600 hover:border-slate-500'
            }`}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-3">Categoría</label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setFormData(prev => ({ ...prev, category: cat.name }))}
              className={`group relative p-3 rounded-xl transition-all ${
                formData.category === cat.name
                  ? `bg-gradient-to-br ${cat.color} shadow-lg scale-105`
                  : 'bg-slate-700/50 hover:bg-slate-700 border border-slate-600'
              }`}
              title={cat.name}
            >
              <span className="text-2xl block">{cat.icon}</span>
              <span className={`text-xs block mt-1 ${formData.category === cat.name ? 'text-white font-bold' : 'text-slate-400'}`}>
                {cat.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Fecha</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            onFocus={() => setFocused('date')}
            onBlur={() => setFocused(null)}
            className={`w-full bg-slate-700/50 border-2 rounded-lg px-4 py-3 text-white transition-all ${
              focused === 'date' ? 'border-purple-400 shadow-lg shadow-purple-400/20' : 'border-slate-600 hover:border-slate-500'
            }`}
          />
        </div>
        
        <button
          onClick={handleSubmit}
          className="mt-7 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/30 transform hover:scale-105 active:scale-95"
        >
          + Agregar Gasto
        </button>
      </div>
    </div>
  );
};

// ============ COMPONENTE: Filtros Premium ============
const FilterPanel = ({ filters, onFilterChange }) => {
  const categories = ['Todas', 'Alimentación', 'Transporte', 'Entretenimiento', 'Salud', 'Educación', 'Otros'];

  return (
    <div className="bg-gradient-to-r from-slate-800 via-slate-800 to-slate-900 p-6 rounded-2xl shadow-xl border border-slate-700/50 backdrop-blur-xl">
      <h3 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
        <Filter size={20} className="text-purple-400" /> Filtros
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Categoría</label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white hover:border-purple-500 focus:outline-none focus:border-purple-400 transition-all"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Desde</label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => onFilterChange('startDate', e.target.value)}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white hover:border-blue-500 focus:outline-none focus:border-blue-400 transition-all"
          />
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Hasta</label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => onFilterChange('endDate', e.target.value)}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white hover:border-green-500 focus:outline-none focus:border-green-400 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

// ============ COMPONENTE: Lista Premium ============
const ExpenseList = ({ expenses, onDeleteExpense }) => {
  const categoryColors = {
    'Alimentación': 'from-orange-400 to-red-500',
    'Transporte': 'from-blue-400 to-cyan-500',
    'Entretenimiento': 'from-purple-400 to-pink-500',
    'Salud': 'from-green-400 to-emerald-500',
    'Educación': 'from-indigo-400 to-purple-500',
    'Otros': 'from-gray-400 to-slate-500',
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-12 rounded-2xl shadow-xl border border-slate-700/50 text-center">
        <p className="text-slate-400 text-lg">📊 No hay gastos registrados en este período</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map(exp => (
        <div key={exp.id} className="group bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-4 hover:border-slate-600 transition-all hover:shadow-lg hover:shadow-slate-900/50 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColors[exp.category]} opacity-90 flex items-center justify-center font-bold text-white shadow-lg`}>
                {exp.amount.toFixed(0)[0]}
              </div>
              
              <div className="flex-1">
                <p className="text-white font-semibold">{exp.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold text-white bg-gradient-to-r ${categoryColors[exp.category]} opacity-80`}>
                    {exp.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(exp.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right mr-4">
                <p className="text-2xl font-black text-white">${exp.amount.toFixed(2)}</p>
              </div>
              <button
                onClick={() => onDeleteExpense(exp.id)}
                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded-lg transition-all"
                title="Eliminar"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ============ COMPONENTE: Estadísticas Premium ============
const Statistics = ({ expenses }) => {
  const stats = useMemo(() => {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const byCategory = {};
    const dailyData = {};

    expenses.forEach(exp => {
      byCategory[exp.category] = (byCategory[exp.category] || 0) + exp.amount;
      const date = exp.date;
      dailyData[date] = (dailyData[date] || 0) + exp.amount;
    });

    return { total, byCategory, dailyData };
  }, [expenses]);

  const categoryData = Object.entries(stats.byCategory).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2))
  })).sort((a, b) => b.value - a.value);

  const chartData = Object.entries(stats.dailyData)
    .map(([date, amount]) => ({
      date: new Date(date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
      amount: parseFloat(amount.toFixed(2))
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-7);

  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 rounded-2xl p-6 shadow-2xl border border-purple-400/20">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <p className="text-blue-100 text-sm font-semibold mb-2">TOTAL DE GASTOS</p>
            <p className="text-4xl font-black text-white">${stats.total.toFixed(2)}</p>
            <p className="text-blue-200 text-xs mt-2">En los últimos 30 días</p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 rounded-2xl p-6 shadow-2xl border border-green-400/20">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <p className="text-emerald-100 text-sm font-semibold mb-2">PROMEDIO</p>
            <p className="text-4xl font-black text-white">
              ${expenses.length > 0 ? (stats.total / expenses.length).toFixed(2) : '0.00'}
            </p>
            <p className="text-emerald-200 text-xs mt-2">Por transacción</p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-pink-600 via-purple-600 to-pink-700 rounded-2xl p-6 shadow-2xl border border-pink-400/20">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <p className="text-pink-100 text-sm font-semibold mb-2">TRANSACCIONES</p>
            <p className="text-4xl font-black text-white">{expenses.length}</p>
            <p className="text-pink-200 text-xs mt-2">Registros totales</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categoryData.length > 0 && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-xl border border-slate-700/50 backdrop-blur-xl">
            <h3 className="text-white font-black text-lg mb-4">Por Categoría</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={(entry) => entry.name.split(' ')[0]} outerRadius={90} fill="#8884d8" dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} contentStyle={{backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {chartData.length > 0 && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-xl border border-slate-700/50 backdrop-blur-xl">
            <h3 className="text-white font-black text-lg mb-4">Últimos 7 días</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} contentStyle={{backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff'}} />
                <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

// ============ APLICACIÓN PRINCIPAL ============
export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Supermercado Carrefour', amount: 45.50, category: 'Alimentación', date: '2025-10-28' },
    { id: 2, description: 'Gasolina Shell', amount: 60, category: 'Transporte', date: '2025-10-27' },
    { id: 3, description: 'Entrada Cine Premium', amount: 20, category: 'Entretenimiento', date: '2025-10-25' },
    { id: 4, description: 'Consulta Médica', amount: 35, category: 'Salud', date: '2025-10-24' },
    { id: 5, description: 'Curso Desarrollo Web', amount: 99, category: 'Educación', date: '2025-10-20' },
    { id: 6, description: 'Almuerzo Restaurante', amount: 55, category: 'Alimentación', date: '2025-10-19' },
  ]);

  const [filters, setFilters] = useState({
    category: 'Todas',
    startDate: '2025-09-01',
    endDate: new Date().toISOString().split('T')[0]
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  const filteredExpenses = useMemo(() => {
    return expenses.filter(exp => {
      const categoryMatch = filters.category === 'Todas' || exp.category === filters.category;
      const dateMatch = exp.date >= filters.startDate && exp.date <= filters.endDate;
      return categoryMatch && dateMatch;
    });
  }, [expenses, filters]);

  const currentMonth = new Date().toISOString().slice(0, 7);
  const thisMonthExpenses = expenses.filter(exp => exp.date.startsWith(currentMonth));
  const totalThisMonth = thisMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const lastMonthExpenses = expenses.filter(exp => exp.date.startsWith('2025-09'));
  const lastMonthTotal = lastMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const percentChange = lastMonthTotal > 0 ? Math.round(((totalThisMonth - lastMonthTotal) / lastMonthTotal) * 100) : 0;
  const totalBalance = 5000;

  const handleAddExpense = (exp) => {
    setExpenses(prev => [exp, ...prev]);
  };

  const handleDeleteExpense = (id) => {
    if (confirm('¿Eliminar este gasto?')) {
      setExpenses(prev => prev.filter(e => e.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-8">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        <Header totalBalance={totalBalance} totalExpenses={totalThisMonth} percentChange={percentChange} />

        <div className="flex gap-2 border-b border-slate-700/50 backdrop-blur-xl">
          {[
            { id: 'dashboard', label: '📊 Dashboard' },
            { id: 'register', label: '➕ Registrar' },
            { id: 'list', label: '📋 Historial' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-bold transition-all relative ${
                activeTab === tab.id
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <Statistics expenses={filteredExpenses} />
          </div>
        )}

        {activeTab === 'register' && (
          <div>
            <ExpenseForm onAddExpense={handleAddExpense} />
          </div>
        )}

        {activeTab === 'list' && (
          <div className="space-y-6">
            <FilterPanel filters={filters} onFilterChange={(key, val) => setFilters(prev => ({ ...prev, [key]: val }))} />
            <div className="text-sm text-slate-400 ml-1">
              📊 Mostrando <span className="text-cyan-400 font-semibold">{filteredExpenses.length}</span> de <span className="text-cyan-400 font-semibold">{expenses.length}</span> gastos
            </div>
            <ExpenseList expenses={filteredExpenses} onDeleteExpense={handleDeleteExpense} />
          </div>
        )}
      </div>
    </div>
  );
}