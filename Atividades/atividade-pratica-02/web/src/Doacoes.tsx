import * as React from 'react';
import axios from 'axios';
import {Divider, TextField, Select, MenuItem, SelectChangeEvent, Autocomplete} from '@mui/material';
import Button from '@mui/material/Button';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';

// New interfaces
interface Pessoa {
  id: number;
  nome: string;
  rua: string;
  numero: string;
  complemento: string;
  rg: string;
  cidadeId: number;
  tipoId: number;
}

interface LocalColeta {
  createdAt: string;
  updatedAt: string;
  id: number;
  nome: string;
  rua: string;
  numero: string;
  complemento: string;
  cidadeId: number;
  cidade: {
    createdAt: string;
    updatedAt: string;
    id: number;
    nome: string;
    estadoId: number;
    estado: {
      createdAt: string;
      updatedAt: string;
      id: number;
      nome: string;
      sigla: string;
    }
  };
}

interface Doacao {
  createdAt: string;
  updatedAt: string;
  id: number;
  pessoaId: number;
  pessoa: Pessoa;
  localId: number;
  localColeta: LocalColeta;
  data: string;
}

const Doacoes = () => {
  const [doacoes, setDoacoes] = React.useState<Doacao[]>([]);
  const [pessoaId, setPessoaId] = React.useState<number | null>(null);
  const [localId, setLocalId] = React.useState<number | null>(null);
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [data, setData] = React.useState(() => editingId === null ? new Date().toISOString().slice(0, 10) : '');
  const [pessoas, setPessoas] = React.useState<Pessoa[]>([]);
  const [locais, setLocais] = React.useState<LocalColeta[]>([]);

  const fetchDoacoes = () => {
    axios.get('http://localhost:5183/doacoes')
        .then((res) => setDoacoes(res.data))
        .catch((e) => console.error(e));
  };

  const fetchPessoas = () => {
    axios.get('http://localhost:5183/pessoas')
        .then((res) => setPessoas(res.data))
        .catch((e) => console.error(e));
  };

  const fetchLocais = () => {
    axios.get('http://localhost:5183/locais')
        .then((res) => setLocais(res.data))
        .catch((e) => console.error(e));
  };

  React.useEffect(() => {
    fetchDoacoes();
    fetchPessoas();
    fetchLocais();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const doacao = {
      pessoaId,
      localId,
      data
    };

    if (editingId !== null) {
      axios.put(`http://localhost:5183/doacao/${editingId}`, doacao)
          .then(fetchDoacoes);
    } else {
      axios.post('http://localhost:5183/doacao', doacao)
          .then(fetchDoacoes);
    }

    resetForm();
  };

  const deleteDoacao = (id: number) => {
    axios.delete(`http://localhost:5183/doacao/${id}`)
        .then(fetchDoacoes);
  };

  const editDoacao = (id: number) => {
    const doacao = doacoes.find((d) => d.id === id);

    if (doacao) {
      setPessoaId(doacao.pessoaId);
      setLocalId(doacao.localId);
      setData(doacao.data);
      setEditingId(doacao.id);
    }
  };

  const resetForm = () => {
    setPessoaId(null);
    setLocalId(null);
    setData(new Date().toISOString().slice(0, 10));
    setEditingId(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          sx={{ mb: 2 }}
          options={pessoas}
          getOptionKey={(option) => option.id}
          getOptionLabel={(option) => option.nome}
          value={pessoaId ? pessoas.find(p => p.id === pessoaId) : null}
          onChange={(event, newValue) => {
            setPessoaId(newValue ? newValue.id : 1)
          }}
          renderInput={(params) => <TextField {...params} label="Pessoa" />}
        />
        <Autocomplete
          sx={{ mb: 2 }}
          options={locais}
          getOptionKey={(option) => option.id}
          getOptionLabel={(option) => option.nome}
          value={localId ? locais.find(l => l.id === localId) : null}
          onChange={(event, newValue) => {
            setLocalId(newValue ? newValue.id : 1)
          }}
          renderInput={(params) => <TextField {...params} label="Local" />}
        />
        <TextField
            sx={{ mb: 2 }}
            label="Data"
            type="date"
            value={data.split('T')[0]}
            onChange={(e) => setData(e.target.value)}
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
        {doacoes.map((doacao) => (
          <ListItem key={doacao.id}>
            <ListItemText
              primary={doacao.pessoa.nome}
              secondary={'Local de coleta: ' + doacao.localColeta.nome + ', Data: ' + doacao.data}
            />
            <ListItemSecondaryAction>
              <Button color="primary" onClick={() => editDoacao(doacao.id)}>Editar</Button>
              <Button color="secondary" onClick={() => deleteDoacao(doacao.id)}>Deletar</Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Doacoes;