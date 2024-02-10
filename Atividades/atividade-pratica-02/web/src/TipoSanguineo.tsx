import * as React from 'react';
import axios from 'axios';
import {Divider, TextField} from '@mui/material';
import Button from '@mui/material/Button';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';

interface TipoSanguineo {
  id: number;
  tipo: string;
  fator: string;
  createdAt: string;
  updatedAt: string;
}

const TiposSanguineos = () => {
  const [tiposSanguineo, setTiposSanguineo] = React.useState<TipoSanguineo[]>([]);
  const [tipo, setTipo] = React.useState<string | null>(null);
  const [fator, setFator] = React.useState<string | null>(null);
  const [editingId, setEditingId] = React.useState<number | null>(null);

  const fetchTiposSanguineo = () => {
    axios.get('http://localhost:5183/tiposanguineo')
        .then((res) => setTiposSanguineo(res.data))
        .catch((e) => console.error(e));
  };

  React.useEffect(() => {
    fetchTiposSanguineo();// Fetching blood type data when component mounts
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tipoSanguineo = {
      tipo,
      fator
    };

    if (editingId !== null) {
      axios.put(`http://localhost:5183/tiposanguineo/${editingId}`, tipoSanguineo)
          .then(fetchTiposSanguineo);
    } else {
      axios.post('http://localhost:5183/tiposanguineo', tipoSanguineo)
          .then(fetchTiposSanguineo);
    }

    resetForm();
  };

  const deleteTipoSanguineo = (id: number) => {
    axios.delete(`http://localhost:5183/tiposanguineo/${id}`)
        .then(fetchTiposSanguineo);
  };

  const editTipoSanguineo = (id: number) => {
    const tipoSanguineo = tiposSanguineo.find((t) => t.id === id);

    if (tipoSanguineo) {
      setTipo(tipoSanguineo.tipo);
      setFator(tipoSanguineo.fator);
      setEditingId(tipoSanguineo.id);
    }
  };

  const resetForm = () => {
    setTipo(null);
    setFator(null);
    setEditingId(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
            sx={{ mb: 2 }}
            label="Tipo"
            value={tipo || ''}
            onChange={(e) => setTipo(e.target.value)}
            fullWidth
        />
        <TextField
            sx={{ mb: 2 }}
            label="Fator"
            value={fator || ''}
            onChange={(e) => setFator(e.target.value)}
            fullWidth
        />
        <Button
          sx={{ mt: 2 }}
          type="submit"
          color="primary"
          variant="contained"
        >
          Enviar
        </Button>
        {editingId && (
          <Button
            color="primary"
            variant="outlined"
            sx={{ ml: 2, mt: 2 }}
            onClick={resetForm}
          >
            Cancelar Edição
          </Button>
        )}
      </form>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <List>
        {tiposSanguineo.map((tipoSanguineo) => (
          <ListItem key={tipoSanguineo.id}>
            <ListItemText
              primary={tipoSanguineo.tipo + tipoSanguineo.fator}
            />
            <ListItemSecondaryAction>
              <Button color="primary" onClick={() => editTipoSanguineo(tipoSanguineo.id)}>Editar</Button>
              <Button color="secondary" onClick={() => deleteTipoSanguineo(tipoSanguineo.id)}>Deletar</Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default TiposSanguineos;