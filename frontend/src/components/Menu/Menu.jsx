import { useState } from 'react';
import Section from '../Section/Section';
import BotonPedido from '../BotonPedido/BotonPedido';
import OrderModal from '../OrderModal/OrderModal';
import { secciones } from '../../data';

const Menu = () => {
    const [pedido, setPedido] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            
            // Si nos quedamos sin items, cerramos el modal automáticamente
            if (nuevoPedido.length === 0) setIsModalOpen(false);
        }
    };

    // 3. CONFIRMAR Y ENVIAR
    const confirmarPedido = (nombreCliente) => {
        const resumen = pedido.reduce((acc, item) => {
            acc[item] = (acc[item] || 0) + 1;
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

    return (
        <>
            <div className="menu-container">
                {secciones.map((s, index) => (
                    <Section
                        key={index}
                        titulo={s.titulo}
                        link={s.link}
                        imagen={s.imagen}
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

            {/* Pasamos tanto agregar como eliminar al modal */}
            <OrderModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmarPedido}
                pedido={pedido}                   // Lista completa
                agregarUno={agregarAlPedido}      // Botón (+)
                eliminarUno={eliminarUnidad}      // Botón (-)
            />
        </>
    );
};

export default Menu;