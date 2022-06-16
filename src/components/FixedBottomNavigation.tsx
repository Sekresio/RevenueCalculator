import * as React from 'react';
import {SyntheticEvent} from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {useNavigate} from "react-router-dom";

const FixedBottomNavigation = () => {
    const [value, setValue] = React.useState('/');
    const ref = React.useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
        navigate(newValue);
    }

    return (
        <Box sx={{pb: 7}} ref={ref}>
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                <BottomNavigation
                    value={value}
                    onChange={handleChange}
                >
                    <BottomNavigationAction
                        value="/addClient"
                        label="Add"
                        icon={<AddIcon/>}
                    />
                    <BottomNavigationAction
                        value="/"
                        label="List"
                        icon={<FormatListBulletedIcon/>}
                    />
                    <BottomNavigationAction
                        value="/money"
                        label="Money"
                        icon={<AttachMoneyIcon/>}
                    />
                </BottomNavigation>
            </Paper>
        </Box>
    );
};

export default FixedBottomNavigation;