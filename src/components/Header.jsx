import { ArrowUpRight } from 'lucide-react';

const formatCurrency = (value) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(value);

export default function Header({
  totalBalance,
  totalExpenses,
  percentChange,
}) {
  const availableBalance = totalBalance - totalExpenses;
  const isIncrease = percentChange > 0;
  const isDecrease = percentChange < 0;

  return (
    <header className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-400 font-semibold mb-2">
          FinanceFlow
        </p>

        <h1 className="text-3xl md:text-5xl font-black tracking-tight">
          Control de gastos
        </h1>

        <p className="text-slate-400 mt-3 max-w-2xl">
          Registra, filtra y visualiza tus gastos desde un dashboard simple y claro.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <article className="rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl p-5">
          <p className="text-sm text-slate-400 mb-2">
            Balance disponible
          </p>

          <p className="text-2xl md:text-3xl font-bold">
            {formatCurrency(availableBalance)}
          </p>

          <p className="text-xs text-slate-500 mt-2">
            Sobre un balance inicial de {formatCurrency(totalBalance)}
          </p>
        </article>

        <article className="rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl p-5">
          <p className="text-sm text-slate-400 mb-2">
            Gastos este mes
          </p>

          <p className="text-2xl md:text-3xl font-bold">
            {formatCurrency(totalExpenses)}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <ArrowUpRight
              size={16}
              className={
                isIncrease
                  ? 'text-red-400'
                  : isDecrease
                    ? 'text-emerald-400 rotate-90'
                    : 'text-slate-500'
              }
            />

            <span
              className={`text-xs font-semibold ${
                isIncrease
                  ? 'text-red-400'
                  : isDecrease
                    ? 'text-emerald-400'
                    : 'text-slate-500'
              }`}
            >
              {percentChange > 0 ? '+' : ''}
              {percentChange}%
            </span>

            <span className="text-xs text-slate-500">
              vs. mes anterior
            </span>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-blue-600/20 to-cyan-500/10 backdrop-blur-xl p-5">
          <p className="text-sm text-slate-400 mb-2">
            Estado financiero
          </p>

          <p className="text-2xl md:text-3xl font-bold">
            {availableBalance >= 0 ? 'En orden' : 'Sobrepasado'}
          </p>

          <p className="text-xs text-slate-400 mt-2">
            {availableBalance >= 0
              ? 'Tus gastos se mantienen dentro del balance disponible.'
              : 'Tus gastos superan el balance definido.'}
          </p>
        </article>
      </div>
    </header>
  );
}