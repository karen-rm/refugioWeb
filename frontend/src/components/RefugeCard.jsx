export default function RefugeCard({ refugio }) {
    return (
        <article className="group overflow-hidden rounded-2xl bg-slate-800/50 border border-slate-700/50">

            <div className="relative h-72 overflow-hidden">
                <img
                    src={refugio.url_imagen}
                    alt={refugio.nombre}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <div className="p-6">

                <p className="text-xs text-cyan-400 uppercase tracking-widest mb-2">
                    {refugio.estado}
                </p>

                <h3 className="text-2xl font-serif italic text-white mb-3">
                    {refugio.nombre}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed mb-5">
                    {refugio.descripcion}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-2 py-1 rounded bg-slate-700/50 text-xs text-slate-300">
                        Hasta {refugio.max_capacidad} personas
                    </span>

                    {refugio.permite_ninos && (
                        <span className="px-2 py-1 rounded bg-slate-700/50 text-xs text-slate-300">
                            Se permiten niños
                        </span>
                    )}
                </div>

                <div className="border-t border-slate-700/50 pt-5">
                    <p className="text-sm text-slate-400">
                        {refugio.direccion}
                    </p>
                </div>

                <button className="w-full mt-5 py-3 rounded-full border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-slate-950 transition-all">
                    Iniciar sesión para reservar
                </button>

            </div>
        </article>
    );
}