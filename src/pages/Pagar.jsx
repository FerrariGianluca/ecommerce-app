import { useNavigate } from "react-router-dom"
import { useCartContext } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';
import { toast } from "react-toastify";

function Pagar() {
    const navigate = useNavigate();
    const { carrito, vaciarCarrito, precioTotal } = useCartContext();
    const { usuario, cerrarSesion } = useAuthContext();

    const comprar = () => {
        toast.success('¡Compra realizada con éxito!');
        navigate('/productos');
        vaciarCarrito();
    }

    return (
        <div>
            <div>
                <h2>{usuario.nombre}</h2>
                <button onClick={cerrarSesion}>Cerrar Sesión</button>
            </div>

            <div className="p-5">
                <h2 className="mb-4">Tu compra:</h2>
                <div className="border-bottom">
                {carrito.map(producto => (
                    <div key={producto.id}>
                        <span className="fs-5 fw-bold text-danger">{producto.producto} x{producto.cant} - </span>
                        <span className="fs-5">${(producto.precio * producto.cant).toFixed(2)}</span>
                    </div>
                ))}
                </div>
                <p className="fs-5 text-dark bg-light rounded-4 p-2 shadow-sm"><span className="fw-bold">Total:</span><span> ${precioTotal}</span></p>
            </div>

            <div>
                <button onClick={comprar}>Confirmar y Pagar</button>
                <button onClick={() => navigate('/carrito')}>Cancelar</button>
            </div>
        </div>
    )
}

export default Pagar