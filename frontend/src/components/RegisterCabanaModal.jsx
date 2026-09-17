import { useState } from 'react';
import { registrarCabana } from '../services/api';

export default function RegisterCabanaModal({ isOpen, onClose }) {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('');
    const [direccion, setDireccion] = useState('');
    const [maxCapacidad, setMaxCapacidad] = useState('');
    const [permiteNinos, setPermiteNinos] = useState(false);
    const [urlImagen, setUrlImagen] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    if (!isOpen) {
        return null;
    }

  
    async function manejarSubmit(event) {
        event.preventDefault();

        setError('');
        setCargando(true);

        const cabana = {
            nombre,
            descripcion,
            estado,
            direccion,
            max_capacidad: Number(maxCapacidad),
            permite_ninos: permiteNinos,
            url_imagen: urlImagen,
        };

        try {
            await registrarCabana(cabana);

            alert('Cabaña registrada correctamente');

            onClose();

            window.location.reload();
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">

            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[#121c2d] border border-slate-700 shadow-2xl">

                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700">
                    <div>
                        <p className="text-xs text-cyan-400 uppercase tracking-widest">
                            Administrador
                        </p>

                        <h2 className="text-2xl font-serif italic text-white">
                            Registrar cabaña
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-white text-2xl"
                    >
                        ×
                    </button>
                </div>

                <form
                    onSubmit={manejarSubmit}
                    className="p-6 space-y-4"
                >

                    <input
                        type="text"
                        placeholder="Nombre de la cabaña"
                        value={nombre}
                        onChange={(event) => setNombre(event.target.value)}
                        className="w-full box-border bg-transparent border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                        required
                    />

                    <textarea
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(event) => setDescripcion(event.target.value)}
                        rows="3"
                        className="w-full box-border bg-transparent border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none resize-none"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Estado"
                        value={estado}
                        onChange={(event) => setEstado(event.target.value)}
                        className="w-full box-border bg-transparent border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Dirección"
                        value={direccion}
                        onChange={(event) => setDireccion(event.target.value)}
                        className="w-full box-border bg-transparent border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                        required
                    />

                    <input
                        type="number"
                        placeholder="Capacidad máxima"
                        min="1"
                        value={maxCapacidad}
                        onChange={(event) => setMaxCapacidad(event.target.value)}
                        className="w-full box-border bg-transparent border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                        required
                    />

                    <input
                        type="url"
                        placeholder="URL de imagen"
                        value={urlImagen}
                        onChange={(event) => setUrlImagen(event.target.value)}
                        className="w-full box-border bg-transparent border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                        required
                    />

                    <label className="flex items-center gap-3 text-sm text-white cursor-pointer">
                        <input
                            type="checkbox"
                            checked={permiteNinos}
                            onChange={(event) => setPermiteNinos(event.target.checked)}
                            className="w-4 h-4 accent-cyan-400"
                        />

                        Permitir niños
                    </label>

                    {error && (
                        <p className="text-red-400 text-sm text-center">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={cargando}
                        className="w-full bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-slate-950 font-bold py-3 rounded-lg transition-colors"
                    >
                        {cargando ? 'Registrando...' : 'Registrar cabaña'}
                    </button>

                </form>
            </div>
        </div>
    );
}

