import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newProduct: any) => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ open, onClose, onAdd }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: '', // Añadido campo de imagen
  });

  React.useEffect(() => {
    if (!open) {
      // Limpiar el formulario cuando se cierre el diálogo
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        image_url: '',
      });
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    onAdd(formData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar Producto</DialogTitle>
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
        <Button onClick={handleAdd} color="primary">
          Agregar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;
