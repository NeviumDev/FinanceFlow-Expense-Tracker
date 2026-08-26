# FinanceFlow — Expense Tracker

FinanceFlow es una aplicación web desarrollada con React para registrar, filtrar y visualizar gastos desde un dashboard interactivo.

El proyecto fue creado como una aplicación frontend de gestión financiera personal, con foco en una interfaz clara, visualización de datos y organización de gastos por categoría.

## Características

- Registro de gastos
- Eliminación de movimientos
- Filtrado por categoría
- Filtrado por rango de fechas
- Dashboard con métricas principales
- Visualización de gastos por día
- Distribución de gastos por categoría
- Cálculo automático del gasto mensual
- Comparación con el mes anterior
- Diseño responsive
- Interfaz desarrollada con Tailwind CSS
- Gráficos interactivos con Recharts

## Tecnologías

- React
- Vite
- Tailwind CSS
- Recharts
- Lucide React
- ESLint
- JavaScript

## Estructura del proyecto

```text
src/
├── components/
│   ├── ExpenseForm.jsx
│   ├── ExpenseList.jsx
│   ├── FilterPanel.jsx
│   ├── Header.jsx
│   └── Statistics.jsx
│
├── constants/
│   └── categories.js
│
├── data/
│   └── initialExpenses.js
│
├── App.jsx
├── index.css
└── main.jsx

La aplicación está dividida en componentes independientes para separar la interfaz, la lógica de presentación y los datos utilizados por la demo.

Instalación

Clona el repositorio:

git clone https://github.com/TU-USUARIO/TU-REPOSITORIO.git

Entra al proyecto:

cd TU-REPOSITORIO

Instala las dependencias:

npm install

Ejecuta el entorno de desarrollo:

npm run dev

Vite mostrará la dirección local donde estará disponible la aplicación.

Scripts disponibles
Desarrollo
npm run dev

Inicia el servidor de desarrollo.

Build de producción
npm run build

Genera la versión optimizada para producción.

Previsualización
npm run preview

Permite previsualizar localmente el build de producción.

Lint
npm run lint

Analiza el código utilizando ESLint.

Datos de demostración

FinanceFlow incluye gastos de ejemplo para que el dashboard tenga información disponible inmediatamente al iniciar la aplicación.

Las fechas de los datos iniciales se generan de forma relativa al momento de ejecución, evitando que la demo dependa de fechas antiguas o hardcodeadas.

Persistencia

Actualmente los gastos se mantienen únicamente en el estado de React.

Esto significa que los movimientos creados durante una sesión se pierden al recargar la página.

El proyecto no utiliza actualmente:

Backend
Base de datos
Sistema de autenticación
Sincronización entre dispositivos

La persistencia mediante localStorage o una API puede incorporarse como una evolución futura del proyecto.

Arquitectura

El componente principal App.jsx administra:

Estado de los gastos
Filtros
Navegación entre secciones
Resumen financiero
Creación y eliminación de movimientos

Los componentes visuales están separados dentro de:

src/components/

Las categorías y colores asociados se encuentran centralizados en:

src/constants/categories.js

Los datos utilizados inicialmente por la demo se encuentran en:

src/data/initialExpenses.js
Estado del proyecto

Proyecto funcional y disponible como demostración frontend.

El código fue reorganizado y actualizado para mejorar su estructura, mantenibilidad y presentación como proyecto de portfolio.

Posibles mejoras

Algunas extensiones posibles:

Persistencia con localStorage
Backend y base de datos
Autenticación
Presupuestos mensuales configurables
Ingresos y balance real
Exportación de movimientos
Más opciones de análisis
Tests automatizados
Progressive Web App
Licencia

Este proyecto está disponible con fines educativos y de portfolio.


Solo te queda cambiar:

```text
TU-USUARIO
TU-REPOSITORIO
