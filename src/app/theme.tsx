import './app.module.scss';
import { createTheme } from '@mui/material';

export const appColors = {
  primary: '#074300',
  secondary: '#6d4300',
};

const bodyFont = 'sans-serif';

const buildGlobalTheme = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: appColors.primary,
      },
      secondary: {
        main: appColors.secondary,
        contrastText: appColors.primary,
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
    typography: {
      fontFamily: bodyFont,
    },
  });

  return theme;
};

export const THEME_GLOBAL = buildGlobalTheme();
