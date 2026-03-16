// Usamos una variable de entorno de Vite. 
// Si no existe, cae en localhost por defecto.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const apiFetch = async (endpoint, method = 'GET', bodyData = null) => {
  const url = `${API_BASE_URL}/${endpoint}`;

  const config = {
    method: method,
    headers: {},
  };

  // Si bodyData es un FormData (para imágenes), NO ponemos "Content-Type"
  // El navegador lo pondrá solo como "multipart/form-data; boundary=..."
  const isFormData = bodyData instanceof FormData;
  if (!isFormData) {
    config.headers["Content-Type"] = "application/json";
  }

  if (bodyData) {
    // Si es FormData, lo mandamos tal cual. Si no, lo pasamos a JSON.
    config.body = isFormData ? bodyData : JSON.stringify(bodyData);
  }

  try {
    const res = await fetch(url, config);
    
    // Si el servidor no devuelve nada (204 No Content), evitamos el .json()
    const data = res.status !== 204 ? await res.json() : null;

    if (!res.ok) {
      throw new Error(data?.error || data?.message || `Error en la solicitud a ${url}.`);
    }

    return data;
  } catch (error) {
    console.error(`Error en apiFetch para ${url} (${method}):`, error);
    throw error;
  }
};