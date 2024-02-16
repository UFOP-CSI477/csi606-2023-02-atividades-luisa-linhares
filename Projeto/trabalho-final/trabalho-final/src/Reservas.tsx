import axios from 'axios';
import { useEffect, useState } from 'react';
import { Stack, Typography, Button, ListItem, List, Divider } from '@mui/material';
import { Box } from '@mui/system'; // Import Box from MUI

type Reserva = {
    id: number;
    dataReserva: string;
    idSala: number;
    idUsuario: number;
    sala: {
        id: number;
        name: string;
    },
    usuario: {
        id: number;
        name: string;
        cpf: string;
        email: string;
        telefone: string;
    }
};

const Reservas:React.FC<{userId: string}> = ({userId}) => {
    const [reservas, setReservas] = useState<Reserva[]>([]);
    useEffect(() => {
        const fetchUserReservas = async () => {
            const res = await axios.get(`http://localhost:5123/reservas?userId=${userId}`);
            setReservas(res.data);
        };
        fetchUserReservas();
    }, [userId]);
    const handleDelete = async (id: number) => {
        await axios.delete(`http://localhost:5123/reserva/${id}`);
        setReservas(reservas.filter(reserva => reserva.id !== id));
    };

    return (
        <Stack spacing={2} sx={{ width: '100%', maxWidth: 800, margin: '0 auto', paddingTop: '2rem', paddingBottom: '2rem', px: '1rem'}}>
            <Typography variant="h4" gutterBottom component="div">Minhas Reservas</Typography>
            <List>
                {reservas.map((reserva) => (
                    <Box key={reserva.id} sx={{ width: '100%', bgcolor: 'background.paper', mt: '1rem' }}>
                        <ListItem>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="body1">Reserva Sala: {reserva.sala.name} - Data: {new Date(reserva.dataReserva).toLocaleString()} - Usuário: {reserva.usuario.name}</Typography>
                                <Button variant="contained" onClick={() => handleDelete(reserva.id)}>Delete</Button>
                            </Stack>
                        </ListItem>
                        <Divider />
                    </Box>
                ))}
            </List>
        </Stack>
    );
};

export default Reservas;