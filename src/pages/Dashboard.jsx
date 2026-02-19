import React, {useState} from 'react'
import { useProductsContext } from '../context/ProductsContext';
import '../styles/dashboard.css';
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { productos, eliminarProducto, cargando, error, cargarProductos } = useProductsContext();
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const navigate = useNavigate();
  const productosPorPagina = 10;
  const productosFiltrados = productos.filter(producto => {
    const texto = busqueda.toLowerCase();
    return (
      producto.producto.toLowerCase().includes(texto) ||
      producto.tipo?.toLowerCase().includes(texto)
    )
  })
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto)
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina)

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
  if (cargando){
    return ( 
      <div className="container-carga">
        <img src='/spinner.gif' alt="Spinner" width="50px" />
        <p>Cargando...</p>
      </div>
    )
  }
  if (error) {
    return (
      <div className="text-center my-5">
        <p className="text-danger">{error}</p>
        <button className="btn btn-primary" onClick={cargarProductos}>
          Reintentar
        </button>
      </div>
    );
  }
  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Dashboard Admin</h2>
        <button className="btn btn-primary" onClick={() => navigate('/formulario-producto')}>+ Agregar producto</button>
      </div>
      <div className='mb-3'>
        <div className='position-relative'>
          <input 
            type='text'
            placeholder='Buscar por nombre o categoría...'
            className='form-control'
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPaginaActual(1);
            }}
          />
          <span><FaSearch className='position-absolute top-50 end-0 translate-middle-y me-3' /></span>
        </div>
        <small className='text-muted'>
          Mostrando {productosFiltrados.length} de {productos.length} productos
        </small>
      </div>
      <div className='dashboard-list'>
        {productosActuales.length > 0 ?
          <div className="d-flex flex-column gap-3 w-100">
            {productosActuales.map(item => (
              <div className="card shadow-sm p-3 product-card" key={item.id}>
                <div className="product-row d-flex gap-3">
                  <img 
                    src={item.img || '/no-image.jpg'} 
                    alt={item.producto} 
                    className="product-img" 
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/no-image.jpg';
                    }}
                  />
                  <div className="product-content d-flex flex-column flex-grow-1">
                    <h5 className="mb-1 fw-semibold">{item.producto}</h5>
                    <p className="text-muted mb-1">{item.descripcion}</p>
                    <span className="fw-bold">${item.precio}</span>
                  </div>
                  <div className="product-actions d-flex gap-2 mt-auto">
                    <button className="btn btn-outline-primary btn-sm" onClick={() => navigate('/formulario-producto', { state: { producto: item } })}>Editar</button>
                    <button className="btn btn-outline-danger btn-sm" onClick={()=>confirmarEliminar(item)}>Eliminar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        : (
          <div className='no-results text-muted'>No se encontraron productos</div>
        )}
        </div>
        {productosFiltrados.length > productosPorPagina && (
          <div className='d-flex justify-content-center my-4'>
            {Array.from({ length: totalPaginas }, (_, index) => (
              <button
                key={index + 1}
                className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setPaginaActual(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
    </div>
  )
}

export default Dashboard