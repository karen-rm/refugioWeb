import { useState } from 'react';
import { editarCabana, eliminarCabana } from '../services/api';
import EditCabanaModal from './EditCabanaModal';

export default function RefugeCard({ refugio }) {
    const [usuario] = useState(() => {
        const usuarioGuardado = localStorage.getItem('usuario');

        return usuarioGuardado
            ? JSON.parse(usuarioGuardado)
            : null;
    });

    const [isEditOpen, setIsEditOpen] = useState(false);

    const esAdministrador = usuario?.rol === 'administrador';

    async function manejarGuardar(cabana) {
        try {
            await editarCabana(refugio.id_cabana, cabana);

            alert('Cabaña actualizada correctamente');

            setIsEditOpen(false);

            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }

    async function manejarEliminar() {
        const confirmar = window.confirm(
            `¿Estás seguro de eliminar "${refugio.nombre}"?`
        );

        if (!confirmar) {
            return;
        }

        try {
            await eliminarCabana(refugio.id_cabana);

            alert('Cabaña eliminada correctamente');

            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <>
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

                    <p className="text-sm text-white leading-relaxed mb-5">
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
                        <p className="text-sm">
                            {refugio.direccion}
                        </p>
                    </div>

                    {esAdministrador && (
                        <>
                            <button
                                onClick={() => setIsEditOpen(true)}
                                className="w-full mt-3 py-3 rounded-full border border-slate-500 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
                            >
                                Editar cabaña
                            </button>

                            <button
                                onClick={manejarEliminar}
                                className="w-full mt-3 py-3 rounded-full border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                            >
                                Eliminar cabaña
                            </button>
                        </>
                    )}

                </div>
            </article>

            <EditCabanaModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                refugio={refugio}
                onGuardar={manejarGuardar}
            />
        </>
    );
}
