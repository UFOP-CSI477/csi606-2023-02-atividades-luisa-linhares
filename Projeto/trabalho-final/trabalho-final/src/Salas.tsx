import { useState, useEffect } from 'react';
import { Autocomplete, TextField, Button, Card, CardContent, Stack, Typography, Box } from '@mui/material';
import axios from 'axios';

type Reserva = {
    id: number;
    dataReserva: string;
};
type Sala = {
    id: number;
    name: string;
};

function SalaReserva({user}:any) {
    const getCurrentDate = () => {
        const now = new Date();
        let month = (now.getMonth() + 1).toString();
        let day = now.getDate().toString();
        month = month.length === 1 ? '0' + month : month;
        day = day.length === 1 ? '0' + day : day;
        return `${now.getFullYear()}-${month}-${day}`;
    }
    const [salas, setSalas] = useState<Sala[]>([]);
    const [salaId, setSalaId] = useState("");
    const [data, setData] = useState(getCurrentDate());
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [displayCards, setDisplayCards] = useState(false);
    const [reservaFeita, setReservaFeita] = useState<boolean>(false);
    const horas = Array.from({length: 24}, (_, i) => i);

    useEffect(() => {
        const fetchSalas = async () => {
            const result = await axios('http://localhost:5123/salas');
            setSalas(result.data);
        };
        fetchSalas();
    }, []);

    const handleSalaId = (event: React.SyntheticEvent, value: Sala | null) => {
        setDisplayCards(false);
        if (value) {
            setSalaId(value.id.toString());
        }
    };

    const handleData = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(event.target.value);
    };

    const fetchReservas = async (id: string) => {
        const result = await axios(`http://localhost:5123/reservas?salaId=${id}`);
        setReservas(result.data);
    };

    const handleBuscar = () => {
        if(salaId) {
            fetchReservas(salaId);
            setDisplayCards(true);
        } else {
            alert('Por favor, selecione uma sala.');
        }
    };

    const handleReservar = async (hora: number) => {
        if (salaId) {
            try {
                const date = new Date(selectedDate);
                date.setHours(hora);
                const localISOTime = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}T${("0" + date.getHours()).slice(-2)}:00:00`;
                const reservaData = {
                    dataReserva: localISOTime,
                    idSala: salaId,
                    idUsuario: user.id
                };

                console.log(selectedDate);
                console.log(hora);

                const result = await axios.post('http://localhost:5123/reservas', reservaData);
                if (result.status === 200 || result.status === 201) {
                    setReservaFeita(true);
                    await fetchReservas(salaId);
                }
            } catch (err) {
                console.error('Reservation error', err);
                setReservaFeita(false);
            }
        } else {
            alert('Por favor, selecione uma sala.');
        }
    };

    const selectedDateParts = data.split("-").map(Number);
    const selectedDate = new Date(selectedDateParts[0], selectedDateParts[1] - 1, selectedDateParts[2]);

    return (
        <Stack spacing={2}>
            <Typography variant="h4" gutterBottom component="div">Reserva de Sala</Typography>
            <Autocomplete
                id="sala-autocomplete"
                options={salas}
                getOptionLabel={(option) => option.name}
                onChange={handleSalaId}
                renderInput={(params) => <TextField {...params} label="Sala" required />} />
            <TextField
                id="date-local"
                label="Data Reserva"
                type="date"
                defaultValue={getCurrentDate()}
                InputLabelProps={{ shrink: true }}
                onChange={handleData} />
            <Button onClick={handleBuscar} variant="contained">Pesquisar</Button>
            <Box>
                {displayCards && horas.filter(hora => {
                    const now = new Date();
                    const currentHour = now.getHours();
                    const isSelectedDateToday = selectedDate.getFullYear() === now.getFullYear() && selectedDate.getMonth() === now.getMonth() && selectedDate.getDate() === now.getDate();
                    const isSelectedDateFuture = selectedDate.getFullYear() > now.getFullYear() || (selectedDate.getFullYear() === now.getFullYear() && selectedDate.getMonth() > now.getMonth()) || (selectedDate.getMonth() === now.getMonth() && selectedDate.getDate() > now.getDate());
                    return isSelectedDateFuture || (isSelectedDateToday && hora >= currentHour);
                }).map(hora => {
                    const reservaNaHora = reservas.find(reserva => {
                        const reservaDate = new Date(reserva.dataReserva);
                        return reservaDate.getHours() === hora && reservaDate.getFullYear() === selectedDate.getFullYear() && reservaDate.getMonth() === selectedDate.getMonth() && reservaDate.getDate() === selectedDate.getDate();
                    });
                    return (
                        <Card key={hora} variant="outlined" sx={{ marginBottom: 2, backgroundColor: reservaNaHora ? '#d3d3d3' : '#90ee90' }}>
                            <CardContent>
                                <Typography variant="h6">{`${hora}:00 - ${reservaNaHora ? 'Indisponível' : 'Disponível'}`}</Typography>
                                {!reservaNaHora && <Button onClick={() => handleReservar(hora)} variant="contained">Reservar</Button>}
                            </CardContent>
                        </Card>
                    )
                })}
            </Box>
        </Stack>
    );
}
export default SalaReserva;