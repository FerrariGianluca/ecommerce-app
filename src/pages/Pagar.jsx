import { useNavigate } from "react-router-dom"
import { useCartContext } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';
import { toast } from "react-toastify";
import '../styles/pagar.css';

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
        <div className="container my-4">
            <div className="text-center mb-4">
                <h5 className="mb-0">Hola, {usuario.nombre}</h5>
            </div>

            <div className="card shadow-sm p-4 pagar-card">
                <h3 className="mb-4 text-center">Resumen de compra</h3>
                <div className="pagar-lista border-bottom pb-3 mb-3">
                {carrito.map(producto => (
                    <div key={producto.id} className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-semibold">{producto.producto} x{producto.cant}</span>
                        <span className="text-dark">${(producto.precio * producto.cant).toFixed(2)}</span>
                    </div>
                ))}
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-light rounded">
                    <span className="fw-bold fs-5">Total</span>
                    <span className="fw-bold fs-5">${precioTotal}</span>
                </div>

                <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-outline-secondary" onClick={() => navigate('/carrito')}>Volver</button>
                    <button className="btn btn-success" onClick={comprar}>Confirmar y pagar</button>
                </div>
            </div>
        </div>
    )
}

export default Pagar