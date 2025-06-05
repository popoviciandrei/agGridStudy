import React from "react";

const App = (): React.JSX.Element => {
  return (
    <div className="max-w-6xl mx-auto p-8 text-center">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold mb-2 text-slate-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Vite + React + AG Grid + TypeScript + Tailwind
        </h1>
        <p className="text-lg text-slate-600">
          A modern data grid with powerful features, type safety, and beautiful
          styling
        </p>
      </div>
    </div>
  );
};

export default App;
