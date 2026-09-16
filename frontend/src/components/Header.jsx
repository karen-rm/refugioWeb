
export default function Header() {
    return (
        <header className="relative z-10 flex justify-between items-center px-6 py-8 md:px-16">
            <div className="flex gap-4 items-center">
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                    
                </a>

                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                    
                </a>
            </div>

            <div>
                <h1 className="text-2xl md:text-3xl font-serif italic text-white font-medium tracking-wide">
                    bosques<span className="text-cyan-400">&</span>refugios
                </h1>
            </div>
        </header>
    );
}