import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

interface AtomicButtonProps {
    label: string;                            // Texte à afficher sur le bouton
    onClick?: () => void;                     // Fonction appelée lors du clic
    variant?: 'text' | 'outlined' | 'contained';  // Variante de style du bouton MUI
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';  // Couleur du bouton
    size?: 'small' | 'medium' | 'large';      // Taille du bouton
    disabled?: boolean;                       // Désactiver le bouton
    fullWidth?: boolean;                      // Si vrai, le bouton occupera toute la largeur de son conteneur
    startIcon?: React.ReactNode;              // Icône à afficher avant le texte
    endIcon?: React.ReactNode;                // Icône à afficher après le texte
    sx?: object;                              // Styles additionnels via sx
}

const CustomButton = styled(Button)(() => ({
    borderRadius: '8px',                      // Bordures arrondies personnalisées
    textTransform: 'none',                    // Ne pas transformer le texte en majuscules
    padding: '8px 16px',                      // Espacement interne personnalisé
    fontWeight: 600,                          // Poids de la police pour un style plus marqué
    '&:hover': {
        opacity: 0.85,                        // Effet visuel sur le hover
    },
}));

export const AtomicButton = ({
    label,
    onClick,
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    disabled = false,
    fullWidth = false,
    startIcon,
    endIcon,
    sx = {},
}: AtomicButtonProps): JSX.Element => {
    return (
        <CustomButton
            variant={variant}
            color={color}
            size={size}
            disabled={disabled}
            fullWidth={fullWidth}
            onClick={onClick}
            startIcon={startIcon}
            endIcon={endIcon}
            sx={sx}
        >
            {label}
        </CustomButton>
    );
};
