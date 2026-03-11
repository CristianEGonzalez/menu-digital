const Admin = () => {
  return (
    // 1. Contenedor Maestro: h-screen y overflow-hidden evita el scroll de toda la página
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden font-sans">
      
      {/* 2. SIDEBAR: Ancho fijo, no se mueve */}
      <aside className="w-64 bg-black shrink-0 flex flex-col border-r border-gray-800">
        <div className="p-6">
          <h2 className="text-yellow-400 text-xl font-black italic tracking-tighter">OLD SPRINGFIELD</h2>
          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Admin Panel</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <button className="w-full flex items-center gap-3 p-3 bg-yellow-400 text-black rounded-lg font-bold text-sm transition-all cursor-pointer">
            <span>🍔</span> PRODUCTOS
          </button>
          <button className="w-full flex items-center gap-3 p-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg font-medium text-sm transition-all cursor-pointer">
            <span>📂</span> SECCIONES
          </button>
        </nav>

        <div className="p-4 mt-auto border-t border-gray-800">
          <button className="w-full py-2 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-lg transition">
            CERRAR SESIÓN
          </button>
        </div>
      </aside>

      {/* 3. ÁREA DE CONTENIDO: Flex col para separar Topbar de la Tabla */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* TOPBAR: Siempre arriba */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Dashboard / <span className="text-black">Productos</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black bg-green-100 text-green-600 px-2 py-1 rounded">ONLINE</span>
            <div className="w-8 h-8 bg-yellow-400 rounded-full border border-black flex items-center justify-center">🍩</div>
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL: Solo esto tiene scroll */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Header del contenido */}
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-black uppercase italic text-gray-900 tracking-tight">Gestión de Menú</h1>
              <button className="bg-black text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-[4px_4px_0_0_#fbbf24] hover:shadow-none transition-all active:translate-y-1">
                + AGREGAR PRODUCTO
              </button>
            </div>

            {/* CARDS: Ajustadas para que no se vean gigantes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard label="Productos" val="16" icon="🍔" />
              <StatCard label="Secciones" val="4" icon="📂" />
              <StatCard label="Top" val="Maggie Cheese" icon="🔥" />
            </div>

            {/* TABLA: Con contenedor para evitar que rompa el layout */}
            <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full text-center text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="p-4 font-bold text-gray-400 uppercase text-[10px]">Producto</th>
                    <th className="p-4 font-bold text-gray-400 uppercase text-[10px]">Sección</th>
                    <th className="p-4 font-bold text-gray-400 uppercase text-[10px]">Precio</th>
                    <th className="p-4 font-bold text-gray-400 uppercase text-[10px]">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <TableRow name="Maggie Cheese" section="Burgers" price="8.50" />
                  {/* Aquí mapearás tus productos reales */}
                </tbody>
              </table>
            </div>

          </div>
        </main>

        {/* FOOTER: En un dashboard, el footer es solo una barrita de estado opcional */}
        <footer className="h-10 bg-white border-t border-gray-200 flex items-center px-8 text-[10px] text-gray-400 font-medium">
          © 2026 Old Springfield - Panel de Administración
        </footer>
      </div>
    </div>
  );
};

// Componentes pequeños para limpiar el código principal
const StatCard = ({ label, val, icon }) => (
  <div className="bg-white p-4 border border-gray-200 flex items-center justify-between shadow-sm">
    <div>
      <p className="text-[10px] font-black uppercase text-gray-400">{label}</p>
      <p className="text-xl font-black text-gray-900">{val}</p>
    </div>
    <span className="text-2xl">{icon}</span>
  </div>
);

const TableRow = ({ name, section, price }) => (
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="p-4 flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden shadow-inner">
        <img src="https://via.placeholder.com/50" alt="burger" className="w-full h-full object-cover" />
      </div>
      <span className="font-bold text-gray-700">{name}</span>
    </td>
    <td className="p-4">
      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] font-bold uppercase">{section}</span>
    </td>
    <td className="p-4 font-mono font-bold text-gray-500">${price}</td>
    <td className="p-4 text-right">
      <button className="text-blue-500 hover:text-blue-700 mr-3 transition">✏️</button>
      <button className="text-red-400 hover:text-red-600 transition">🗑️</button>
    </td>
  </tr>
);

export default Admin;