import { useEffect, useState } from 'react';

import FilterBar from '../components/FilterBar';
import Hero from '../components/Hero';
import RefugeCard from '../components/RefugeCard';

import { obtenerCabanas } from '../services/api';

export default function Home() {
    const [cabanas, setCabanas] = useState([]);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        obtenerCabanas()
            .then((data) => {
                setCabanas(data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    return (
        <main>
            <Hero />

            <FilterBar />

            <section className="max-w-7xl mx-auto px-6 py-16">
                <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-10">
                    Elige tu refugio
                </h2>

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
        </main>
    );
}