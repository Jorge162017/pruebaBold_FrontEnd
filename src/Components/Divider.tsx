import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface IntroDividerProps {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  onEdit: () => void;
  onDelete: () => void;
}

const IntroDivider: React.FC<IntroDividerProps> = ({ name, description, price, category, imageUrl, onEdit, onDelete }) => {
  return (
    <Card variant="outlined" sx={{ maxWidth: 360 }}>
      <Box sx={{ p: 2 }}>
        <img src={imageUrl} alt={name} style={{ width: '100%', height: 'auto' }} />
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Q{price.toFixed(2)}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          <strong>Categoria:</strong> {category}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
          <IconButton aria-label="edit" sx={{ color: 'black' }} onClick={onEdit}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" sx={{ color: 'red' }} onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Box>
    </Card>
  );
};

export default IntroDivider;
