import { useMemo, useState } from 'react';

import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import FilterPanel from './components/FilterPanel';
import Header from './components/Header';
import Statistics from './components/Statistics';

import { initialExpenses } from './data/initialExpenses';

const TOTAL_BALANCE = 5000;

const TABS = [
  { id: 'dashboard', label: '📊 Dashboard' },
  { id: 'register', label: '➕ Registrar' },
  { id: 'list', label: '📋 Historial' },
];

const formatDateInput = (date) => date.toISOString().split('T')[0];

const getMonthKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

const getPreviousMonthKey = () => {
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() - 1);
  return getMonthKey(date);
};

export default function App() {
  const [expenses, setExpenses] = useState(initialExpenses);

  const [filters, setFilters] = useState({
    category: 'Todas',
    startDate: '',
    endDate: formatDateInput(new Date()),
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const categoryMatch =
        filters.category === 'Todas' ||
        expense.category === filters.category;

      const startDateMatch =
        !filters.startDate ||
        expense.date >= filters.startDate;

      const endDateMatch =
        !filters.endDate ||
        expense.date <= filters.endDate;

      return categoryMatch && startDateMatch && endDateMatch;
    });
  }, [expenses, filters]);

  const financialSummary = useMemo(() => {
    const currentMonth = getMonthKey(new Date());
    const previousMonth = getPreviousMonthKey();

    const totalThisMonth = expenses
      .filter((expense) => expense.date.startsWith(currentMonth))
      .reduce((sum, expense) => sum + expense.amount, 0);

    const totalPreviousMonth = expenses
      .filter((expense) => expense.date.startsWith(previousMonth))
      .reduce((sum, expense) => sum + expense.amount, 0);

    const percentChange =
      totalPreviousMonth > 0
        ? Math.round(
            ((totalThisMonth - totalPreviousMonth) / totalPreviousMonth) * 100
          )
        : 0;

    return {
      totalThisMonth,
      percentChange,
    };
  }, [expenses]);

  const handleAddExpense = (expense) => {
    setExpenses((currentExpenses) => [
      expense,
      ...currentExpenses,
    ]);
  };

  const handleDeleteExpense = (id) => {
    if (!window.confirm('¿Eliminar este gasto?')) return;

    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id)
    );
  };

  const handleFilterChange = (key, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-8">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse [animation-delay:2s]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        <Header
          totalBalance={TOTAL_BALANCE}
          totalExpenses={financialSummary.totalThisMonth}
          percentChange={financialSummary.percentChange}
        />

        <nav
          className="flex gap-2 border-b border-slate-700/50 backdrop-blur-xl"
          aria-label="Secciones principales"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-bold transition-all relative ${
                  isActive
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.label}

                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {activeTab === 'dashboard' && (
          <Statistics expenses={filteredExpenses} />
        )}

        {activeTab === 'register' && (
          <ExpenseForm onAddExpense={handleAddExpense} />
        )}

        {activeTab === 'list' && (
          <div className="space-y-6">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            <p className="text-sm text-slate-400 ml-1">
              📊 Mostrando{' '}
              <span className="text-cyan-400 font-semibold">
                {filteredExpenses.length}
              </span>{' '}
              de{' '}
              <span className="text-cyan-400 font-semibold">
                {expenses.length}
              </span>{' '}
              gastos
            </p>

            <ExpenseList
              expenses={filteredExpenses}
              onDeleteExpense={handleDeleteExpense}
            />
          </div>
        )}
      </div>
    </div>
  );
}