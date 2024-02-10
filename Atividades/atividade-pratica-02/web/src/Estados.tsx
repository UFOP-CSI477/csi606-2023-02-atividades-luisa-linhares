import * as React from 'react';
import axios from 'axios';
import {List, Divider, TextField, ListItem, ListItemText, ListItemSecondaryAction, Button} from '@mui/material';

interface Estado {
  createdAt: string;
  updatedAt: string;
  id: number;
  nome: string;
  sigla: string;
}

const Estados = () => {
  const [estados, setEstados] = React.useState<Estado[]>([]);
  const [nome, setNome] = React.useState('');
  const [sigla, setSigla] = React.useState('');
  const [editingId, setEditingId] = React.useState<number | null>(null);

  const fetchEstados = () => {
    axios.get('http://localhost:5183/estados')
        .then((res) => setEstados(res.data))
        .catch((e) => console.error(e));
  };

  React.useEffect(() => {
    fetchEstados();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const estado = {nome, sigla};

    if (editingId !== null) {
      axios.put(`http://localhost:5183/estado/${editingId}`, estado)
          .then(fetchEstados);
    } else {
      axios.post('http://localhost:5183/estado', estado)
          .then(fetchEstados);
    }

    resetForm();
  };

  const deleteEstado = (id: number) => {
    axios.delete(`http://localhost:5183/estado/${id}`)
        .then(fetchEstados);
  };

  const editEstado = (id: number) => {
    const estado = estados.find((p) => p.id === id);

    if (estado) {
      setNome(estado.nome);
      setSigla(estado.sigla);
      setEditingId(estado.id);
    }
  };

  const resetForm = () => {
    setNome('');
    setSigla('');
    setEditingId(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{ mb: 2 }}
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          fullWidth
        />
        <TextField
          sx={{ mb: 2 }}
          label="Sigla"
          value={sigla}
          onChange={(e) => setSigla(e.target.value)}
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
        {estados.map((estado) => (
          <ListItem key={estado.id}>
            <ListItemText
              primary={estado.nome}
              secondary={'Sigla: ' + estado.sigla}
            />
            <ListItemSecondaryAction>
              <Button color="primary" onClick={() => editEstado(estado.id)}>Editar</Button>
              <Button color="secondary" onClick={() => deleteEstado(estado.id)}>Deletar</Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Estados;