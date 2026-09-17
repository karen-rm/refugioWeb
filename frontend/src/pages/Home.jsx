import { useEffect, useState } from 'react';

import FilterBar from '../components/FilterBar';
import Hero from '../components/Hero';
import RefugeCard from '../components/RefugeCard';
import RegisterCabanaModal from '../components/RegisterCabanaModal';

import { obtenerCabanas } from '../services/api';


export default function Home() {
    const [cabanas, setCabanas] = useState([]);
    const [error, setError] = useState(null);

    const [usuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuario');

        return usuarioGuardado
            ? JSON.parse(usuarioGuardado)
            : null;
    });

    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    useEffect(() => {
        obtenerCabanas()
            .then((data) => {
                setCabanas(data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    function cerrarSesion() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');

        window.location.reload();
    }

    const esAdministrador = usuario?.rol === 'administrador';

    

    return (
        
        <main>
            <Hero />

            <FilterBar />

            <section className="max-w-7xl mx-auto px-6 py-16">

            {usuario && (
                <div className="flex items-center justify-between mb-10 px-5 py-4 rounded-xl bg-slate-800 border border-slate-600">

                    <div className="flex items-center gap-4">

                        <div>
                            <p className="text-xs text-slate-300 uppercase tracking-widest mb-1">
                                Sesión
                            </p>

                            <p className="text-base text-white font-medium">
                                {usuario.correo}
                            </p>
                        </div>

                        {esAdministrador && (
                            <span className="px-3 py-1 rounded-full bg-cyan-400 text-slate-900 text-xs font-semibold">
                                Administrador
                            </span>
                        )}

                    </div>

                    <button
                        onClick={cerrarSesion}
                        className="text-sm text-white hover:text-red-400 transition-colors"
                    >
                        Cerrar sesión
                    </button>

                </div>
            )}


                <div className="flex items-center justify-between mb-10">

                    <h2 className="text-4xl md:text-5xl font-serif italic text-white">
                        {esAdministrador
                            ? 'Administrar refugios'
                            : 'Elige tu refugio'}
                    </h2>

                    {esAdministrador && (
                        <button
                            onClick={() => setIsRegisterOpen(true)}
                            className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold px-5 py-3 rounded-full transition-colors"
                        >
                            + Registrar cabaña
                        </button>
                    )}

                </div>

                {error && (
                    <p className="text-red-400 mb-6">
                        {error}
                    </p>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                    {cabanas.map((cabana) => (
                        <RefugeCard
                            key={cabana.id_cabana}
                            refugio={cabana}
                        />
                    ))}
                </div>

            </section>

            <RegisterCabanaModal
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
            />
        </main>
    );
}
