const API_URL = 'https://api-refugios.onrender.com';

export async function iniciarSesion(correo, contrasena) {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            correo,
            contrasena,
        }),
    });

    if (!response.ok) {
        throw new Error('Correo o contraseña incorrectos');
    }

    const data = await response.json();

    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.usuario));

    return data;
}

export async function obtenerCabanas() {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/api/cabana`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('No se pudieron obtener las cabañas');
    }

    const data = await response.json();

    return data.cabanas;
}