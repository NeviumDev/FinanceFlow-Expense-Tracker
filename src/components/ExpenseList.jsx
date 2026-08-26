import { Trash2 } from 'lucide-react';
import { categoryColors } from '../constants/categories';

const formatCurrency = (value) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

export default function ExpenseList({ expenses, onDeleteExpense }) {
  if (!expenses.length) {
    return (
      <section className="rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl p-8 text-center">
        <p className="text-lg font-semibold text-slate-200">
          No hay gastos para mostrar
        </p>

        <p className="text-sm text-slate-500 mt-2">
          Prueba modificando los filtros o registra un nuevo gasto.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl overflow-hidden">
      <div className="hidden md:grid md:grid-cols-[1.5fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 border-b border-slate-700/50 text-xs uppercase tracking-wider text-slate-500 font-semibold">
        <span>Descripción</span>
        <span>Categoría</span>
        <span>Fecha</span>
        <span className="text-right">Monto</span>
        <span className="sr-only">Acciones</span>
      </div>

      <div className="divide-y divide-slate-800/80">
        {expenses.map((expense) => {
          const color =
            categoryColors[expense.category] ?? categoryColors.Otros;

          return (
            <article
              key={expense.id}
              className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr_auto] gap-3 md:gap-4 md:items-center px-5 md:px-6 py-5 transition hover:bg-slate-800/30"
            >
              <div>
                <p className="font-semibold text-slate-100">
                  {expense.description}
                </p>

                <p className="md:hidden text-xs text-slate-500 mt-1">
                  {formatDate(expense.date)}
                </p>
              </div>

              <div>
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold"
                  style={{
                    borderColor: `${color}55`,
                    backgroundColor: `${color}15`,
                    color,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                    aria-hidden="true"
                  />

                  {expense.category}
                </span>
              </div>

              <p className="hidden md:block text-sm text-slate-400">
                {formatDate(expense.date)}
              </p>

              <p className="text-lg md:text-base font-bold md:text-right text-slate-100">
                {formatCurrency(expense.amount)}
              </p>

              <button
                type="button"
                onClick={() => onDeleteExpense(expense.id)}
                className="inline-flex items-center justify-center md:w-9 md:h-9 self-start md:self-auto rounded-lg border border-red-500/20 px-3 py-2 md:p-0 text-red-400 transition hover:bg-red-500/10 hover:border-red-500/40"
                aria-label={`Eliminar gasto ${expense.description}`}
                title={`Eliminar ${expense.description}`}
              >
                <Trash2 size={16} />

                <span className="md:hidden ml-2 text-sm font-semibold">
                  Eliminar
                </span>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}