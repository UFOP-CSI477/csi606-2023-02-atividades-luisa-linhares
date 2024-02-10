import * as React from 'react';
import axios from 'axios';
import { Divider, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

interface Local {
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
        };
    };
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

const LocaisDeColeta = () => {
    const [locais, setLocais] = React.useState<Local[]>([]);
    const [nome, setNome] = React.useState('');
    const [rua, setRua] = React.useState('');
    const [numero, setNumero] = React.useState('');
    const [complemento, setComplemento] = React.useState('');
    const [cidadeId, setCidadeId] = React.useState<number | null>(null);
    const [editingId, setEditingId] = React.useState<number | null>(null);
    const [cidades, setCidades] = React.useState<Cidade[]>([]);

    const fetchLocais = () => {
        axios.get('http://localhost:5183/locais')
            .then((res) => setLocais(res.data))
            .catch((e) => console.error(e));
    };

    const fetchCidades = () => {
        axios.get('http://localhost:5183/cidades')
            .then((res) => setCidades(res.data))
            .catch((e) => console.error(e));
    };

    React.useEffect(() => {
        fetchLocais();
        fetchCidades();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const local = {
            nome,
            rua,
            numero,
            complemento,
            cidadeId,
        };

        if (editingId !== null) {
            axios.put(`http://localhost:5183/local/${editingId}`, local)
                .then(fetchLocais);
        } else {
            axios.post('http://localhost:5183/local', local)
                .then(fetchLocais);
        }

        resetForm();
    };

    const deleteLocal = (id: number) => {
        axios.delete(`http://localhost:5183/local/${id}`)
            .then(fetchLocais);
    };

    const editLocal = (id: number) => {
        const local = locais.find((l) => l.id === id);

        if (local) {
            setNome(local.nome);
            setRua(local.rua);
            setNumero(local.numero);
            setComplemento(local.complemento);
            setCidadeId(local.cidadeId);
            setEditingId(local.id);
        }
    };

    const resetForm = () => {
        setNome('');
        setRua('');
        setNumero('');
        setComplemento('');
        setCidadeId(null)
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
                <Autocomplete
                    options={cidades}
                    getOptionLabel={(option) => option.nome}
                    value={cidades.find(city => city.id === cidadeId) || null}
                    onChange={(event: any, newValue: any | null) => {
                        setCidadeId(newValue ? newValue.id : null);
                    }}
                    renderInput={(params) => <TextField {...params} label="Cidade" fullWidth />}
                />
                <Button
                    sx={{ mt: 2 }}
                    type="submit"
                    color="primary"
                    variant="contained"
                >
                    Enviar
                </Button>
                {
                    editingId && (
                        <Button
                            color="primary"
                            variant="outlined"
                            sx={{ ml: 2, mt: 2 }}
                            onClick={resetForm}
                        >
                            Cancelar Edição
                        </Button>
                    )
                }
                </form>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <List>
                    {locais.map((local) => (
                        <ListItem key={local.id}>
                            <ListItemText
                                primary={local.nome}
                                secondary={'Rua: ' + local.rua + ', Número: ' + local.numero + ', Complemento: ' + local.complemento}
                            />
                            <ListItemSecondaryAction>
                                <Button color="primary" onClick={() => editLocal(local.id)}>Editar</Button>
                                <Button color="secondary" onClick={() => deleteLocal(local.id)}>Deletar</Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </>
    );
};
export default LocaisDeColeta;