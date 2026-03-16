import { useState, useEffect } from 'react';
import Section from '../Section/Section';
import BotonPedido from '../BotonPedido/BotonPedido';
import OrderModal from '../OrderModal/OrderModal';
import { apiFetch } from '../../services/apiFetch';

const Menu = () => {
    const [seccionesDB, setSeccionesDB] = useState([]);
    const [productosDB, setProductosDB] = useState([]);
    const [pedido, setPedido] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Cargar datos desde Docker
    useEffect(() => {
        const cargarMenu = async () => {
            try {
                setLoading(true);
                // Traemos secciones y productos en paralelo
                const [dataSecciones, dataProductos] = await Promise.all([
                    apiFetch('sections'),
                    apiFetch('menuItems')
                ]);
                
                setSeccionesDB(dataSecciones);
                setProductosDB(dataProductos);
            } catch (error) {
                console.error("Error al cargar el menú:", error);
            } finally {
                setLoading(false);
            }
        };

        cargarMenu();
    }, []);

    // 1. AGREGAR
    const agregarAlPedido = (producto) => {
        setPedido([...pedido, producto]);
    };

    // 2. ELIMINAR UNO
    const eliminarUnidad = (producto) => {
        const index = pedido.lastIndexOf(producto);
        if (index > -1) {
            const nuevoPedido = [...pedido];
            nuevoPedido.splice(index, 1);
            setPedido(nuevoPedido);
            if (nuevoPedido.length === 0) setIsModalOpen(false);
        }
    };

    // 3. CONFIRMAR Y ENVIAR
    const confirmarPedido = (nombreCliente) => {
        const resumen = pedido.reduce((acc, item) => {
            const nombre = item.name || item; 
            acc[nombre] = (acc[nombre] || 0) + 1;
            return acc;
        }, {});

        let mensaje = `Hola! Soy *${nombreCliente}* y quiero pedir:\n\n`;
        Object.entries(resumen).forEach(([nombre, cantidad]) => {
            mensaje += `- ${cantidad}x ${nombre}\n`;
        });
        
        mensaje += `\nPara comer en el local.`;

        const numeroWhatsapp = import.meta.env.VITE_WHATSAPP_NUMBER;
        const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
        setIsModalOpen(false);
    };

    if (loading) return <div className="loading-screen">Cargando el menú de Springfield...</div>;

    return (
        <>
            <div className="menu-container">
                {seccionesDB.map((s) => (
                    <Section
                        key={s._id} // Usamos el ID de Mongo
                        seccion={s} // Pasamos el objeto completo como acordamos en el componente Section
                        todosLosProductos={productosDB}
                        agregarAlPedido={agregarAlPedido} 
                    />
                ))}
            </div>

            {pedido.length > 0 && (
                <BotonPedido 
                    cantidad={pedido.length} 
                    onClick={() => setIsModalOpen(true)} 
                />
            )}

            <OrderModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmarPedido}
                pedido={pedido} 
                agregarUno={agregarAlPedido} 
                eliminarUno={eliminarUnidad} 
            />
        </>
    );
};

export default Menu;