import * as React from 'react';
import {useEffect, useState} from 'react';
import {Box, CircularProgress, Grid, Paper, Stack, styled, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {loadClientPayments} from "../../store/clientPaymentSlice";

const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    color: theme.palette.text.primary,
    borderRadius: 0
}));

interface ToPayItem {
    name: string,
    toPay: number,
    toPayDate: Date | null
}


const ToPayList = () => {
    const [toPayItems, setToPayItems] = useState<ToPayItem[]>([]);
    const dispatch = useAppDispatch();
    const clientPaymentsState = useAppSelector(state => state.clientPayments);
    const status = clientPaymentsState.clientPaymentsStatus;

    useEffect(() => {
        switch (status) {
            case 'loading':
                dispatch(loadClientPayments());
                break;
            case 'succeeded':
                setToPayItems(clientPaymentsState.clientPayments.map(cp => {
                    return {
                        name: cp.name,
                        toPay: cp.surchargeAmount,
                        toPayDate: cp.surchargePaymentDate
                    } as ToPayItem
                }));
                break;
            case 'failed':
                console.error('Failed to load data!');
                break;
        }

    }, [status, dispatch])

    return (
        <Stack>
            <Item>
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
                : !toPayItems || toPayItems.length === 0
                    ? <Typography variant="overline" align="center" sx={{marginTop: '2rem'}}>Brak klientek</Typography>
                    : toPayItems.sort((a, b) => {
                        return ((a.toPayDate?.getTime() ?? 0) - (b.toPayDate?.getTime() ?? 0));
                    }).map((item, index) =>

                        <Item key={index} sx={(item.toPayDate?.toDateString() === (new Date()).toDateString()) ? {backgroundColor: 'lightpink'} : {}}>
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
                                    <Typography variant="body1">{item.toPay}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography
                                        variant="body1">{item.toPayDate?.toLocaleDateString('pl-PL')}</Typography>
                                </Grid>
                            </Grid>
                        </Item>
                    )
            }
        </Stack>
    )
}

export default ToPayList;