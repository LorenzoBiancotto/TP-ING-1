import { AtomicInput } from "../atoms/input/input";
import { AtomicButton } from '../atoms/button/button';
import { Box } from '@mui/material';
import { useState } from "react";

interface SearchBarProps {
    inputPlaceholder: string;
    buttonLabel: string;
    onSearch: (searchTerm: string) => void;
};

export const SearchBar = ({ inputPlaceholder, buttonLabel, onSearch }: SearchBarProps): JSX.Element => {
    const [searchTerm, setSeatchTerm] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSeatchTerm(event.target.value);
    };

    const handleSearchClick = (): void => {
        onSearch(searchTerm);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', }}>
            <AtomicInput type="text" onChange={handleSearch} placeholder={inputPlaceholder} label="Recherche" />
            <AtomicButton label={buttonLabel} onClick={handleSearchClick} />
        </Box>
    );
};