import { useState } from 'react';
import { iniciarSesion } from '../services/api';

export default function LoginModal({ isOpen, onClose }) {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    async function manejarLogin(event) {
        event.preventDefault();

        setError('');
        setCargando(true);

        try {
            await iniciarSesion(correo, contrasena);

            onClose();

            window.location.reload();
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">

            <div className="w-full max-w-sm bg-[#121c2d] rounded-2xl overflow-hidden shadow-2xl relative border border-slate-700/50">

                {/* Header */}
                <div className="relative h-40 flex flex-col items-center justify-center">

                    <img
                        src="https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=800&q=80"
                        alt="Montaña con niebla"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-[#121c2d]/60 mix-blend-multiply"></div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#121c2d] via-[#121c2d]/40 to-transparent"></div>

                    {/* Cerrar */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-3 right-4 z-10 text-gray-400 hover:text-white text-2xl leading-none transition-colors"
                        aria-label="Cerrar modal"
                    >
                        ×
                    </button>

                    <div className="relative z-10 text-center flex flex-col items-center gap-2 mt-4">

                        <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-semibold">
                            Bienvenido
                        </span>

                        <h2 className="font-serif italic text-2xl text-white tracking-wide">
                            bosques<span className="text-cyan-400">&</span>refugios
                        </h2>

                    </div>
                </div>

                {/* Tabs */}
                <div className="flex w-full border-b border-slate-700">

                    <button
                        type="button"
                        className="flex-1 text-center py-3 text-sm text-cyan-400 border-b-2 border-cyan-400 font-medium"
                    >
                        Iniciar sesión
                    </button>

                    <button
                        type="button"
                        className="flex-1 text-center py-3 text-sm text-gray-500 hover:text-gray-300 font-medium transition-colors"
                    >
                        Registrarse
                    </button>

                </div>

                {/* Form */}
                <form
                    onSubmit={manejarLogin}
                    className="p-6 space-y-5"
                >

                    {/* Inputs */}
                    <div className="space-y-4">

                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={correo}
                            onChange={(event) => setCorreo(event.target.value)}
                            className="w-full box-border bg-transparent border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none"
                            required
                        />

                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={contrasena}
                            onChange={(event) => setContrasena(event.target.value)}
                            className="w-full box-border bg-transparent border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none"
                            required
                        />

                    </div>

                    {error && (
                        <p className="text-red-400 text-xs text-center">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={cargando}
                        className="w-full bg-[#38d9ed] hover:bg-cyan-300 disabled:opacity-50 text-slate-900 font-bold py-3 rounded-lg text-sm transition-colors"
                    >
                        {cargando ? 'Entrando...' : 'Entrar al bosque'}
                    </button>

                </form>
            </div>
        </div>
    );
}