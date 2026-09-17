export default function FilterBar() {
    const filtros = ['TODOS', 'ESTADO', 'BOSQUE', 'MONTAÑA'];

    return (
        <div className="flex justify-center gap-8 py-6">
            {filtros.map((filtro) => (
                <button
                    key={filtro}
                    className="text-xs tracking-widest text-slate-400 hover:text-cyan-400 transition-colors"
                >
                    {filtro}
                </button>
            ))}
        </div>
    );
}