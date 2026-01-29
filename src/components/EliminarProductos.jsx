import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function EliminarProducto() {
    const location = useLocation();
    const navigate = useNavigate();
    const producto = location.state?.producto;
    
    const [cargando, setCargando] = useState(false);

    const eliminarProducto = async () => {
        if (!producto) return;
        
        setCargando(true);
        try {
            const respuesta = await
            fetch(`https://695ad9991d8041d5eeb56822.mockapi.io/productos/products/${producto.id}`, {
                method: 'DELETE',
            });
        
            if (!respuesta.ok) throw new Error('Error al eliminar el producto.');
            alert('Producto eliminado correctamente.');
            navigate('/productos');
            setTimeout(() => {
                window.location.reload();
            }, 100);
        } catch (error) {
            console.error(error.message);
            alert('Hubo un problema al eliminar el producto.');
        } finally {
            setCargando(false);
        }
    };

    const manejarEliminar = () => {
        const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar el producto "${producto.producto}"?\n\nEsta acción no se puede deshacer.`);
        if(confirmar) eliminarProducto();
    };


    return (
      <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', textAlign: 'center' }}>
        <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>Eliminar Producto</h2>
       
        <div style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '30px',
          backgroundColor: '#f8f9fa'
        }}>
          <h3 style={{ color: '#dc3545' }}>¿Estás seguro de que deseas eliminar este producto?</h3>
         
          <div style={{ textAlign: 'left', margin: '20px 0' }}>
            <p><strong>Nombre:</strong> {producto.producto}</p>
            <p><strong>Precio:</strong> ${producto.precio}</p>
            <p><strong>Categoría:</strong> {producto.tipo || 'Sin categoría'}</p>
            <p><strong>Descripción:</strong> {producto.descripcion}</p>
          </div>
          
          
          <p style={{ color: '#666', fontStyle: 'italic' }}>
            Esta acción no se puede deshacer. El producto será eliminado permanentemente.
          </p>
        </div>
          
          
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button
            onClick={manejarEliminar}
            disabled={cargando}
            style={{
              padding: '12px 24px',
              backgroundColor: cargando ? '#ccc' : '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: cargando ? 'not-allowed' : 'pointer',
              fontSize: '16px'
            }}
          >
            {cargando ? 'Eliminando...' : 'Sí, Eliminar'}
          </button>
          
          <button
            onClick={() => navigate('/productos')}
            disabled={cargando}
            style={{
              padding: '12px 24px',
              backgroundColor: cargando ? '#ccc' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: cargando ? 'not-allowed' : 'pointer',
              fontSize: '16px'
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    );
} export default EliminarProducto;