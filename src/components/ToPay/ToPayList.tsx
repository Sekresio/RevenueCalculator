import * as React from 'react';
import {Grid, Paper, Stack, styled, Typography} from "@mui/material";

const items = [
    {
        name: "Katarzyna S.",
        toPay: 5000,
        date: new Date("07.10.2022")
    },
    {
        name: "Anna P.",
        toPay: 3000,
        date: new Date("07.15.2022")
    },
    {
        name: "Monika K.",
        toPay: 1000,
        date: new Date("07.22.2022")
    }
]

const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    color: theme.palette.text.primary,
    borderRadius: 0
}));


const ToPayList = () => {
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
            {items.map((item, index) =>
                <Item key={index}>
                    <Grid container sx={{height: 60}} alignItems="center">
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
                            <Typography variant="body1">{item.date.toLocaleDateString('pl-PL')}</Typography>
                        </Grid>
                    </Grid>
                </Item>
            )}
        </Stack>
    )
}

export default ToPayList;