import {Button, Stack, TextField} from "@mui/material";
import {MobileDatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider"
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import * as React from "react";
import {useState} from "react";
import {addClientPayment, ClientPayment} from "../store/clientPaymentSlice";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {LoadingButton} from "@mui/lab";
import { Send as SendIcon} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const AddClient = () => {
    const [name, setName] = useState<string | null>(null);
    const [advanceAmount, setAdvanceAmount] = useState<string | null>(null);
    const [advancePaymentDate, setAdvancePaymentDate] = useState<Date | null>(new Date());
    const [surchargeAmount, setSurchargeAmount] = useState<string | null>(null);
    const [surchargePaymentDate, setSurchargePaymentDate] = useState<Date | null>(null);
    const [comment, setComment] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const loading = useAppSelector(state => state.clientPayments.addClientPaymentLoading);
    const navigate = useNavigate();

    const addClientHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload: ClientPayment = {
            name: name!,
            advanceAmount: Number(advanceAmount!),
            advancePaymentDate: advancePaymentDate!,
            surchargeAmount: Number(surchargeAmount!),
            surchargePaymentDate: surchargePaymentDate,
            surchargePaid: !surchargePaymentDate,
            comment: comment ?? ''
        };

        dispatch(addClientPayment(payload)).then(() => {
            navigate('/');
        });
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form onSubmit={addClientHandler}>
                <Stack gap={2}>
                    <TextField label="Imię i Nazwisko" variant="outlined" required 
                               onChange={(e) => setName(e.target.value)}/>
                    <TextField label="Kwota zaliczki" variant="outlined" type="number" required
                               onChange={(e) => setAdvanceAmount(e.target.value)}/>
                    <MobileDatePicker
                        value={advancePaymentDate}
                        onChange={setAdvancePaymentDate}
                        label="Data zaliczki"
                        inputFormat="MM/dd/yyyy"
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <TextField label="Kwota dopłaty:" variant="outlined" type="number"
                               onChange={(e) => setSurchargeAmount(e.target.value)}/>
                    <MobileDatePicker
                        value={surchargePaymentDate}
                        onChange={setSurchargePaymentDate}
                        label="Data dopłaty"
                        inputFormat="MM/dd/yyyy"
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <TextField label="Komentarz" variant="outlined" multiline rows={4}
                               onChange={(e) => setComment(e.target.value)}/>
                    <LoadingButton
                        type="submit"
                        endIcon={<SendIcon/>}
                        loading={loading}
                        loadingPosition="end"
                        variant="contained"
                    >
                        Dodaj
                    </LoadingButton>
                </Stack>
            </form>
        </LocalizationProvider>
    );
};

export default AddClient;