import React from 'react'
import '../styles/productos.css';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';
import { useProductsContext } from '../context/ProductsContext';
import { toast } from "react-toastify";

function ProductoItem({producto}) {
    const navigate = useNavigate();
    const { sumarProducto, restarProducto, getCant } = useCartContext();
    const { isAdmin } = useAuthContext();
    const { eliminarProducto } = useProductsContext();
    const isDisabled = producto.stock === getCant(producto.id);

    const CONFIRM_DELETE_TOAST_ID = "confirm-delete";
    const confirmarEliminar = (producto) => {
      if (toast.isActive(CONFIRM_DELETE_TOAST_ID)) return;
      toast(
        ({ closeToast }) => (
          <div className='d-flex flex-column align-items-center text-center p-2'>
            <p className='fw-bold text-danger mb-2'>⚠️ ¿Seguro que querés eliminar este producto?</p>
            <div className='text-start border rounded p-2 w-100 bg-light'>
              <p className='mb-1'>
                <span className='fw-bold text-dark'>Producto: </span>
                <span className='text-secondary'>{producto.producto}</span>
              </p>
              <p className='mb-0'>
                <span className='fw-bold text-dark'>ID: </span>
                <span className='text-secondary'>{producto.id}</span>
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <button className='btn btn-danger'
                type="button"
                onClick={async () => {
                  const ok = await eliminarProducto(producto);
                  if (ok) {
                    toast.success("Producto eliminado correctamente");
                    closeToast();
                  } else {
                    toast.error("Hubo un problema al eliminar el producto");
                  }
                }}
              >
                Sí, eliminar
              </button>
              <button type="button" className='btn btn-primary' onClick={closeToast}>Cancelar</button>
            </div>
          </div>
        ),
        {
          toastId: CONFIRM_DELETE_TOAST_ID,
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          position: "top-center",
        }
      );
    };

    const handleSuma = producto => {
      const agregado = sumarProducto(producto)
      if(agregado) toast.success("Producto agregado al carrito")
    }

    const handleResta = producto => {
      const eliminado = restarProducto(producto)
      if(eliminado) toast.success("Producto eliminado del carrito")
    }

    const handleCardClick = () => navigate(`/productos/${producto.id}`)

    return (
        <div className="card" role="button" onClick={handleCardClick}>
            <div className="card-body">
                <div className="card-image-wrapper">
                  <img className="card-img-top" src={producto.img || '/no-image.jpg'} alt={producto.producto}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/no-image.jpg';
                    }}
                  />
                  {getCant(producto.id) > 0 && (
                    <span className="card-badge">
                      {getCant(producto.id)}
                    </span>
                  )}
                </div>
                <div className='card-title'>
                  <h5>{producto.producto}</h5>
                </div>
                <ul className='card-list'>
                  <li>Precio: ${producto.precio}</li>
                </ul>
                <div className="card-actions" onClick={(e) => e.stopPropagation()}>
                  {getCant(producto.id) > 0 ? (
                    <div className='card-actions-count'>
                      <button 
                        className='btn btn-secondary rounded-pill btn-sm'
                        onClick={() => handleResta(producto)}
                      >-</button>
                      <span className='items-add'>{getCant(producto.id)}</span>
                      <button
                        className={`btn btn-success rounded-pill btn-sm ${isDisabled ? 'disabled' : ''}`}
                        onClick={() => {
                          if (isDisabled) return;
                          handleSuma(producto)
                        }}
                      >+</button>
                    </div>
                  ):(
                    <button
                      className='btn btn-success'
                      onClick={() => handleSuma(producto)}
                    >
                      Agregar
                    </button>
                  )}
                  {isAdmin && (
                    <div className='card-actions-admin'>
                      <button 
                        type="button"
                        className='btn btn-primary'
                        onClick={() => navigate("/formulario-producto", { state: {producto:producto}})}
                      >
                        Editar
                      </button>
                      <button 
                        type="button"
                        className='btn btn-danger'
                        onClick={() => confirmarEliminar(producto)}
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
            </div>
        </div>
    )
}

export default ProductoItem