import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles'

interface AtomicInputProps {
    type: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    defaultValue?: string;
    label?: string;
    helperText?: string;
    error?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    required?: boolean;
    multiline?: boolean;
    rows?: number;
    variant?: 'filled' | 'outlined' | 'standard';
    autoComplete?: string;
    autoFocus?: boolean;
    color?: "error" | "primary" | "secondary" | "info" | "success" | "warning",
    sx?: object;
    name?: string;
}

const CustomInput = styled(TextField)(() => ({
    borderRadius: '20px',
    padding: '5px 10px',
}));

export const AtomicInput = ({
    type,
    placeholder,
    onChange,
    value,
    defaultValue,
    label,
    helperText,
    error,
    disabled,
    fullWidth,
    required,
    multiline,
    rows,
    variant = 'outlined',
    autoComplete,
    autoFocus,
    color,
    sx = {},
    name,
}: AtomicInputProps): JSX.Element => {

    return (
        <CustomInput
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            defaultValue={defaultValue}
            label={label}
            helperText={helperText}
            error={error}
            disabled={disabled}
            fullWidth={fullWidth}
            required={required}
            multiline={multiline}
            rows={rows}
            variant={variant}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            color={color}
            sx={sx}
            name={name}
        />
    );
};
