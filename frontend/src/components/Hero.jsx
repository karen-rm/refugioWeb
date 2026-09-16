import Header from './Header';

export default function Hero() {
    return (
        <section className="relative w-full h-screen min-h-[600px] flex flex-col justify-between">

            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=80"
                    alt="Bosque oscuro"
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-slate-950/60 mix-blend-multiply"></div>

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-900"></div>
            </div>

            <Header />

            <div className="relative z-10 flex flex-col items-center justify-center flex-grow text-center px-4 -mt-10">

                <p className="text-cyan-400 text-xs md:text-sm font-semibold tracking-[0.2em] mb-4 uppercase">
                    Desconéctate del mundo
                </p>

                <h2 className="text-6xl md:text-8xl font-serif italic text-white mb-6 leading-tight drop-shadow-lg">
                    Refugios <br /> de México
                </h2>

                <p className="text-slate-300 max-w-xl text-sm md:text-base leading-relaxed mb-10 text-balance">
                    Cabañas y refugios en zonas boscosas y áreas naturales protegidas.
                    <br className="hidden md:block" />
                    Sin señal, sin ruido. Solo tú y el bosque.
                </p>

                <button className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105">
                    Iniciar sesión
                </button>

            </div>
        </section>
    );
}