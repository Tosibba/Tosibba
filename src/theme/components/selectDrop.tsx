import React, { useState } from 'react';
import { Box, Select, MenuItem, Typography, SelectChangeEvent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Define a type for the location data
type Location = {
    id: number;
    name: string;
};

// Modify SelectDrop to accept locationsData and defaultId as props
type SelectDropProps = {
    locationsData: Location[];
    defaultId: number; // Add defaultId prop to set the default selection
};

const SelectDrop: React.FC<SelectDropProps> = ({ locationsData, defaultId }) => {
    const [selected, setSelected] = useState<number>(defaultId); // Use defaultId for initial state

    const handleSelectChange = (event: SelectChangeEvent<number>) => {
        const value = event.target.value as number;
        setSelected(value);
    };

    return (
        <Box>
            <Select
                sx={{
                    width: '100%',
                    height: '52px',
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    borderRadius: '6px',
                    border: '1px solid #595c61',
                    color: '#fff',
                    padding: '0px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent',
                        boxShadow: 'inherit',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent',
                        boxShadow: 'inherit',
                    },
                    '& .MuiSvgIcon-root': {
                        color: '#fff',
                    },
                }}
                value={selected}
                onChange={handleSelectChange}
                IconComponent={(props) => <ExpandMoreIcon {...props} sx={{ color: 'red' }} />}
            >
                {locationsData.map((location) => (
                    <MenuItem key={location.id} value={location.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Typography>{location.name}</Typography>
                        </Box>
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
};

 
export default SelectDrop;
