import * as React from 'react';
import axios from 'axios';
import {Divider, TextField, ListItem, ListItemText, ListItemSecondaryAction, Button} from '@mui/material';
import {Autocomplete} from '@mui/material';
import List from "@mui/material/List";

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

interface Cidade {
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
  };
}

interface TipoSanguineo {
  id: number;
  tipo: string;
  fator: string;
  createdAt: string;
  updatedAt: string;
}

const Pessoas = () => {
  const [pessoas, setPessoas] = React.useState<Pessoa[]>([]);
  const [nome, setNome] = React.useState('');
  const [rua, setRua] = React.useState('');
  const [numero, setNumero] = React.useState('');
  const [complemento, setComplemento] = React.useState('');
  const [rg, setRg] = React.useState('');
  const [cidadeId, setCidadeId] = React.useState<number | null>(null);
  const [tipoId, setTipoId] = React.useState<number | null>(null);
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [tipoSanguineoId, setTipoSanguineoId] = React.useState<number | null>(null);
  const [tiposSanguineo, setTiposSanguineo] = React.useState<TipoSanguineo[]>([]);
  const [cidades, setCidades] = React.useState<Cidade[]>([]);

  const fetchPessoas = () => {
    axios.get('http://localhost:5183/pessoas')
        .then((res) => setPessoas(res.data))
        .catch((e) => console.error(e));
  };

  const fetchCidades = () => {
    axios.get('http://localhost:5183/cidades')
        .then((res) => setCidades(res.data))
        .catch((e) => console.error(e));
  };

  const fetchTiposSanguineo = () => {
    axios.get('http://localhost:5183/tiposanguineo')
        .then((res) => setTiposSanguineo(res.data))
        .catch((e) => console.error(e));
  };

  React.useEffect(() => {
    fetchPessoas();
    fetchCidades();
    fetchTiposSanguineo();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pessoa = {
      nome,
      rua,
      numero,
      complemento,
      rg,
      cidadeId,
      tipoId,
    };

    if (editingId !== null) {
      axios.put(`http://localhost:5183/pessoa/${editingId}`, pessoa)
          .then(fetchPessoas);
    } else {
      axios.post('http://localhost:5183/pessoa', pessoa)
          .then(fetchPessoas);
    }

    resetForm();
  };

  const deletePessoa = (id: number) => {
    axios.delete(`http://localhost:5183/pessoa/${id}`)
        .then(fetchPessoas);
  };

  const editPessoa = (id: number) => {
    const pessoa = pessoas.find((p) => p.id === id);

    if (pessoa) {
      setNome(pessoa.nome);
      setRua(pessoa.rua);
      setNumero(pessoa.numero);
      setComplemento(pessoa.complemento);
      setRg(pessoa.rg);
      setCidadeId(pessoa.cidadeId);
      setTipoId(pessoa.tipoId);
      setEditingId(pessoa.id);
    }
  };

  const resetForm = () => {
    setNome('');
    setRua('');
    setNumero('');
    setComplemento('');
    setRg('');
    setCidadeId(1)
    setTipoId(1)
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
          label="Rua"
          value={rua}
          onChange={(e) => setRua(e.target.value)}
          fullWidth
        />
        <TextField
          sx={{ mb: 2 }}
          label="Número"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          fullWidth
        />
        <TextField
          sx={{ mb: 2 }}
          label="Complemento"
          value={complemento}
          onChange={(e) => setComplemento(e.target.value)}
          fullWidth
        />
        <TextField
          sx={{ mb: 2 }}
          label="RG"
          value={rg}
          onChange={(e) => setRg(e.target.value)}
          fullWidth
        />

        <Autocomplete
          sx={{ mb: 2 }}
          options={cidades}
          getOptionLabel={(option) => option.nome}
          value={cidades.find((cidade) => cidade.id === cidadeId) || null}
          onChange={(event, newValue) => setCidadeId(newValue?.id || null)}
          renderInput={(params) => <TextField {...params} label="Cidade" fullWidth />}
        />

        <Autocomplete
          sx={{ mb: 2 }}
          options={tiposSanguineo}
          getOptionLabel={(option) => option.tipo + option.fator}
          value={tiposSanguineo.find((tipo) => tipo.id === tipoSanguineoId) || null}
          onChange={(event, newValue) => setTipoSanguineoId(newValue?.id || null)}
          renderInput={(params) => <TextField {...params} label="Tipo Sanguíneo" fullWidth />}
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
        {pessoas.map((pessoa) => (
          <ListItem key={pessoa.id}>
            <ListItemText
              primary={pessoa.nome}
              secondary={'Rua: ' + pessoa.rua + ', Número: ' + pessoa.numero + ', Complemento: ' + pessoa.complemento}
            />
            <ListItemSecondaryAction>
              <Button color="primary" onClick={() => editPessoa(pessoa.id)}>Editar</Button>
              <Button color="secondary" onClick={() => deletePessoa(pessoa.id)}>Deletar</Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Pessoas;