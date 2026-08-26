const toDateInput = (date) => date.toISOString().split('T')[0];

const daysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return toDateInput(date);
};

export const initialExpenses = [
  {
    id: 1,
    description: 'Supermercado',
    amount: 45.5,
    category: 'Alimentación',
    date: daysAgo(1),
  },
  {
    id: 2,
    description: 'Netflix',
    amount: 12.99,
    category: 'Entretenimiento',
    date: daysAgo(2),
  },
  {
    id: 3,
    description: 'Uber',
    amount: 18.75,
    category: 'Transporte',
    date: daysAgo(3),
  },
  {
    id: 4,
    description: 'Farmacia',
    amount: 32.4,
    category: 'Salud',
    date: daysAgo(5),
  },
  {
    id: 5,
    description: 'Restaurante',
    amount: 28.9,
    category: 'Alimentación',
    date: daysAgo(8),
  },
  {
    id: 6,
    description: 'Curso online',
    amount: 59.99,
    category: 'Educación',
    date: daysAgo(12),
  },
];