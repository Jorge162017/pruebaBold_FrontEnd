import React, { useState, useEffect } from 'react';
import ResponsiveAppBar from '../Components/Header';
import IntroDivider from '../Components/Divider';
import AddProductDialog from '../Components/AddProductDialog';
import EditProductDialog from '../Components/EditProductDialog';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [editProduct, setEditProduct] = useState<any | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState<any | null>(null);

  useEffect(() => {
    fetch('http://3.129.191.211/api/62175/product')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error al cargar productos:', error));
  }, []);

  const handleEditProduct = (product: any) => {
    setEditProduct(product);
  };

  const handleCloseEditDialog = () => {
    setEditProduct(null);
  };

  const handleSaveProduct = (updatedProduct: any) => {
    fetch(`http://3.129.191.211/api/62175/product/${editProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === data.id ? data : product
          )
        );
        handleCloseEditDialog();
      })
      .catch((error) => console.error('Error al actualizar producto:', error));
  };

  const handleAddProduct = async (newProduct: any) => {
    try {
      await fetch('http://3.129.191.211/api/62175/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
  
      // Realiza una nueva solicitud `GET` para obtener la lista completa de productos
      const response = await fetch('http://3.129.191.211/api/62175/product');
      const data = await response.json();
      setProducts(data);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };
  

  const handleOpenDeleteDialog = (product: any) => {
    setDeleteProduct(product);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteProduct(null);
  };

  const handleDeleteProduct = () => {
    fetch(`http://3.129.191.211/api/62175/product/${deleteProduct.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== deleteProduct.id)
        );
        handleCloseDeleteDialog();
      })
      .catch((error) => console.error('Error al eliminar producto:', error));
  };

  return (
    <>
      <ResponsiveAppBar onAddProductClick={() => setIsAddDialogOpen(true)} />
      <Box sx={{ mt: 4, px: 2, display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: '1200px' }}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <IntroDivider
                name={product.name}
                description={product.description}
                price={parseFloat(product.price)}
                category={product.category}
                imageUrl={product.image_url}
                onEdit={() => handleEditProduct(product)}
                onDelete={() => handleOpenDeleteDialog(product)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      {editProduct && (
        <EditProductDialog
          open={Boolean(editProduct)}
          onClose={handleCloseEditDialog}
          product={editProduct}
          onSave={handleSaveProduct}
        />
      )}
      <AddProductDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddProduct}
      />
      <Dialog
        open={Boolean(deleteProduct)}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Eliminar Producto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar el producto "{deleteProduct?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} sx={{ color: 'red' }}>
            Cancelar
          </Button>
          <Button onClick={handleDeleteProduct} color="primary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HomePage;
