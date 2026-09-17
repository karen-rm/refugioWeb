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

export async function registrarCabana(cabana) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/api/cabana`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cabana),
    });

    if (!response.ok) {
        throw new Error('No se pudo registrar la cabaña');
    }

    return await response.json();
}


export async function editarCabana(idCabana, cabana) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/api/cabana/${idCabana}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cabana),
    });

    if (!response.ok) {
        throw new Error('No se pudo editar la cabaña');
    }

    return await response.json();
}

export async function eliminarCabana(idCabana) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/api/cabana/${idCabana}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('No se pudo eliminar la cabaña');
    }

    return await response.json();
}
