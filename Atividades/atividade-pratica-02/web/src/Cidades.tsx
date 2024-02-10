import * as React from 'react';
import axios from 'axios';
import { Divider, TextField, ListItem, ListItemText, ListItemSecondaryAction, Button } from '@mui/material';
import { Autocomplete } from '@mui/material';
import List from "@mui/material/List";

interface Cidade {
  id: number;
  nome: string;
  estadoId: number;
  estado: {
    id: number;
    nome: string;
    sigla: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Estado {
  createdAt: string;
  updatedAt: string;
  id: number;
  nome: string;
  sigla: string;
}

const Cidades = () => {
  const [cidades, setCidades] = React.useState<Cidade[]>([]);
  const [estados, setEstados] = React.useState<Estado[]>([]);
  const [nome, setNome] = React.useState('');
  const [estado, setEstado] = React.useState<Estado | null>(null);
  const [editingId, setEditingId] = React.useState<number | null>(null);

  const fetchCidades = () => {
    axios.get('http://localhost:5183/cidades')
      .then((res) => setCidades(res.data))
      .catch((e) => console.error(e));
  };

  const fetchEstados = () => {
    axios.get('http://localhost:5183/estados')
      .then((res) => setEstados(res.data))
      .catch((e) => console.error(e));
  };

  React.useEffect(() => {
    fetchCidades();
    fetchEstados();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cidade = {
      nome,
      estadoId: estado?.id,
    };

    if (editingId !== null) {
      axios.put(`http://localhost:5183/cidade/${editingId}`, cidade)
        .then(fetchCidades);
    } else {
      axios.post('http://localhost:5183/cidade', cidade)
        .then(fetchCidades);
    }

    resetForm();
  };

  const deleteCidade = (id: number) => {
    axios.delete(`http://localhost:5183/cidade/${id}`)
      .then(fetchCidades);
  };

  const editCidade = (id: number) => {
    const cidade = cidades.find((c) => c.id === id);

    if (cidade) {
      setNome(cidade.nome);
      setEstado(estados.find((estado) => estado.id === cidade.estadoId) || null);
      setEditingId(cidade.id);
    }
  };

  const resetForm = () => {
    setNome('');
    setEstado(null);
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
        <Autocomplete
          options={estados}
          getOptionLabel={(option) => `${option.nome} (${option.sigla})`}
          value={estado}
          onChange={(event, newValue) => {
            setEstado(newValue);
          }}
          fullWidth
          renderInput={(params) => <TextField {...params} sx={{ mb: 2 }} label="Estado" />}
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
        {cidades.map((cidade) => (
          <ListItem key={cidade.id}>
            <ListItemText
              primary={cidade.nome}
              secondary={'Estado: ' + cidade.estado.nome}
            />
            <ListItemSecondaryAction>
              <Button color="primary" onClick={() => editCidade(cidade.id)}>Editar</Button>
              <Button color="secondary" onClick={() => deleteCidade(cidade.id)}>Deletar</Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Cidades;