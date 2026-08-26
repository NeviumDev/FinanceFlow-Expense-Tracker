import { useState } from 'react';
import { Plus } from 'lucide-react';
import { categories } from '../constants/categories';

const today = () => new Date().toISOString().split('T')[0];

export default function ExpenseForm({ onAddExpense }) {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: categories[0],
    date: today(),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const description = form.description.trim();
    const amount = Number(form.amount);

    if (!description || !Number.isFinite(amount) || amount <= 0) {
      window.alert('Completa correctamente la descripción y el monto.');
      return;
    }

    onAddExpense({
      id: Date.now(),
      description,
      amount,
      category: form.category,
      date: form.date,
    });

    setForm({
      description: '',
      amount: '',
      category: categories[0],
      date: today(),
    });
  };

  return (
    <section className="max-w-3xl mx-auto">
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl p-6 md:p-8">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-400 font-semibold mb-2">
            Nuevo gasto
          </p>

          <h2 className="text-2xl md:text-3xl font-bold">
            Registrar movimiento
          </h2>

          <p className="text-slate-400 mt-2">
            Añade los datos del gasto para incorporarlo al historial y a las estadísticas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-slate-300 mb-2"
            >
              Descripción
            </label>

            <input
              id="description"
              name="description"
              type="text"
              value={form.description}
              onChange={handleChange}
              placeholder="Ej: Supermercado"
              maxLength={80}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-semibold text-slate-300 mb-2"
              >
                Monto
              </label>

              <input
                id="amount"
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
                placeholder="0"
                min="1"
                step="1"
                inputMode="decimal"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-slate-300 mb-2"
              >
                Categoría
              </label>

              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-semibold text-slate-300 mb-2"
            >
              Fecha
            </label>

            <input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              max={today()}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <button
            type="submit"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20 active:scale-[0.99]"
          >
            <Plus size={18} />
            Registrar gasto
          </button>
        </form>
      </div>
    </section>
  );
}