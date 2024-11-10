import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface EditProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: any;
  onSave: (updatedProduct: any) => void;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({ open, onClose, product, onSave }) => {
  const [formData, setFormData] = React.useState({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    image_url: product.image_url, // Añadido campo de imagen
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Producto</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Precio"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Categoría"
          name="category"
          value={formData.category}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="URL de la Imagen"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: 'red' }}>
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductDialog;
