import { useState } from 'react';
import Section from '../Section/Section';
import BotonPedido from '../BotonPedido/BotonPedido'; // <--- Importamos el nuevo
import { secciones } from '../../data';

const Menu = () => {
    const [pedido, setPedido] = useState([]);

    const agregarAlPedido = (producto) => {
        setPedido([...pedido, producto]);
        console.log("Se agregó:", producto);
    };

    const enviarPedido = () => {
        if (pedido.length === 0) return;

        const resumen = pedido.reduce((acc, item) => {
            acc[item] = (acc[item] || 0) + 1;
            return acc;
        }, {});

        let mensaje = "Hola! Quiero pedir:\n";
        Object.entries(resumen).forEach(([nombre, cantidad]) => {
            mensaje += `- ${cantidad}x ${nombre}\n`;
        });

        const url = `https://wa.me/5491130608503?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
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

            {/* Solo mostramos el botón si hay algo en el pedido */}
            {pedido.length > 0 && (
                <BotonPedido 
                    cantidad={pedido.length} 
                    onClick={enviarPedido} 
                />
            )}
        </>
    );
};

export default Menu;