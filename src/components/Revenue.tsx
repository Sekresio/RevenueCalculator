import * as React from "react";
import {useEffect, useState} from "react";
import {DatePicker, LocalizationProvider, MobileDatePicker} from "@mui/lab";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {Box, CircularProgress, Grid, Paper, Stack, styled, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {loadClientPayments} from "../store/clientPaymentSlice";

const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    color: theme.palette.text.primary,
    borderRadius: 0
}));

interface PaidItem {
    name: string,
    amount: number,
    date: Date
}

const areTheSameYearAndMonth = (
    year: number | undefined | null,
    month: number | undefined | null,
    date: Date | null): boolean => {
    if (!year || !date || !month) {
        return false;
    }
    
    const dateYear = date.getFullYear();
    const dateMonth = date.getMonth();

    return year === dateYear && month === dateMonth;
}

const Revenue = () => {
    const [month, setMonth] = useState<Date | null>(new Date());
    const [year, setYear] = useState<Date | null>(new Date())
    const [paidItems, setPaidItems] = useState<PaidItem[]>([]);
    const dispatch = useAppDispatch();
    const clientPaymentsState = useAppSelector(state => state.clientPayments);
    const status = clientPaymentsState.clientPaymentsStatus;

    useEffect(() => {
        switch (status) {
            case 'loading':
                dispatch(loadClientPayments());
                break;
            case 'succeeded':
                let items: PaidItem[] = [];
                clientPaymentsState.clientPayments.forEach(cp => {
                    if (areTheSameYearAndMonth(year?.getFullYear(), month?.getMonth(), cp.advancePaymentDate)) {
                        const item = {
                            name: cp.name,
                            amount: cp.advanceAmount,
                            date: cp.advancePaymentDate
                        } as PaidItem
                        items.push(item);
                    }

                    if (areTheSameYearAndMonth(year?.getFullYear(), month?.getMonth(), cp.surchargePaymentDate)) {
                        const item = {
                            name: cp.name,
                            amount: cp.surchargeAmount,
                            date: cp.surchargePaymentDate
                        } as PaidItem
                        items.push(item);
                    }
                });
                setPaidItems(items);
                break;
            case 'failed':
                console.error('Failed to load data!');
                break;
        }

    }, [status, dispatch, month, year])

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack>
                <Box sx={{display: 'flex', justifyContent: 'center'}} gap={2}>
                    <MobileDatePicker
                        inputFormat="MM"
                        views={['month']}
                        label="Miesiąc"
                        value={month}
                        onChange={setMonth}
                        showToolbar={false}
                        renderInput={(params) => <TextField {...params} helperText={null}/>}
                    />
                    <MobileDatePicker
                        inputFormat="yyyy"
                        views={['year']}
                        label="Rok"
                        value={year}
                        onChange={setYear}
                        showToolbar={false}
                        renderInput={(params) => <TextField {...params} helperText={null}/>}
                    />
                </Box>
                {status === 'succeeded' && paidItems && paidItems.length > 0
                    && <>
                        <Typography>Suma: {paidItems.map(i => i.amount).reduce((a, b) => a + b)} zł</Typography>
                        <Typography>10%: {paidItems.map(i => i.amount).reduce((a, b) => a + b) * 0.1} zł</Typography>
                    </>
                }
                <Item sx={{marginTop: '1rem'}}>
                    <Grid container sx={{backgroundColor: 'lightgray'}}>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" align="center">Klient</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6" align="center">Kwota</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" align="center">Data</Typography>
                        </Grid>
                    </Grid>
                </Item>
                {status === 'loading'
                    ? <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
                        <CircularProgress/>
                    </Box>
                    : !paidItems || paidItems.length === 0
                        ? <Typography variant="overline" align="center" sx={{marginTop: '2rem'}}>
                            Brak opłat
                        </Typography>
                        : paidItems.sort((a, b) => {
                            return ((a.date.getTime() ?? 0) - (b.date.getTime() ?? 0));
                        }).map((item, index) =>
                            <Item key={index}>
                                <Grid container
                                      sx={{minHeight: 60}}
                                      alignItems="center">
                                    <Grid item xs={1}>
                                        <Typography variant="body1">{index + 1}.</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="body1">{item.name}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="body1">{item.amount}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography
                                            variant="body1">{item.date.toLocaleDateString('pl-PL')}</Typography>
                                    </Grid>
                                </Grid>
                            </Item>
                        )

                }
            </Stack>
        </LocalizationProvider>
    )
}

export default Revenue;