import { ThemeOptions, createTheme } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    text: {
      primary: "#102d40",
      secondary: "#415864",
      button: "#fff",
      grey: "#65747b",
    },
    icon: "#102d40",
    primary: {
      main: "#102d40",
    },
    secondary: {
      main: "#415864",
    },
    green: {
      primary: "#9edbd3",
      secondary: "#137d7e",
    },
    grey: {
      700: "#7E858E",
      600: "#65747b",
      500: "#F4F4F4",
      400: "#f7f6f1",
      300: "#f0f0e9",
      200: "#f7f6f1",
    },
    error: {
      main: "#FF0005",
    },
    divider: "#65747b",
    background: {
      primary: "#fff",
      secondary: "#f7f6f1",
      default: "#f0f0e9",
      error: "#FF0B37",
    },
    button: {
      primary: "#137d7e",
      secondary: "white",
    },
  },
  typography: {
    fontFamily: '"SF Pro Text", Arial, sans-serif',
    h1: {
      fontSize: "4.75rem",
      fontWeight: 800,
      "@media (max-width:600px)": {
        fontSize: "2.75rem",
      },
    },
    h2: {
      fontSize: "3.125rem",
      fontWeight: 700,
      "@media (max-width:600px)": {
        fontSize: "1.875rem",
      },
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
      "@media (max-width:600px)": {
        fontSize: "1.5rem",
      },
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      "@media (max-width:600px)": {
        fontSize: "1.25rem",
      },
    },
    p1: {
      fontSize: "1.125rem",
      fontWeight: 700,
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },
    p2: {
      fontSize: "1.125rem",
      fontWeight: 400,
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },
    f1: {
      fontSize: ".75rem",
      fontWeight: 400,
    },
    f2: {
      fontSize: "1.125rem",
      fontWeight: 300,
    },
    f3: {
      fontSize: "14px",
      fontWeight: 400,
    },
    link: {
      color: "#000",
      fontSize: "1rem",
      fontWeight: 700,
      textDecoration: "underline",
      textTransform: "none",
      letterSpacing: "0.32px",
    },
    button: {
      fontSize: "1rem",
      fontWeight: 700,
      textTransform: "none",
      "@media (max-width:600px)": {
        fontWeight: 500,
        fontSize: ".75rem",
      },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          WebkitFontSmoothing: "auto",
          fontSize: "16px",
        },
        body: {
          margin: 0,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          backgroundColor: "#f7f6f1",
        },
        a: {
          textDecoration: "none",
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            borderRadius: 4,
            padding: "12px 20px",
            "@media (max-width:600px)": {
              padding: "8px 10px",
            },
          },
        },
        {
          props: { variant: "primary" },
          style: {
            color: "#000",
            backgroundColor: "#f7f6f1",
            textTransform: "none",
            borderRadius: 4,
            padding: "12px 20px",
            "&:hover": {
              backgroundColor: "#ffffff",
            },
          },
        },
        {
          props: { variant: "secondary" },
          style: {
            color: "#000",
            backgroundColor: "#9edbd3",
            textTransform: "none",
            borderRadius: 4,
            padding: "12px 20px",
            "&:hover": {
              backgroundColor: "#9edbd3",
            },
          },
        },
      ],
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.primary,
          height: 72,
          display: "flex",
          justifyContent: "center",
        }),
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        formControl: ({ theme }) => ({
          backgroundColor: theme.palette.background.primary,
        }),
      },
    },

    MuiSelect: {
      styleOverrides: {
        select: {
          "&&:focus": {
            backgroundColor: "inherit",
          },
        },
        icon: {
          color: "inherit",
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        valueLabel: {
          borderRadius: "10px",
          backgroundColor: "#137d7e",
          "&:before": {
            width: 0,
          },
        },
        thumb: {
          backgroundColor: "#137d7e",
        },
        track: {
          backgroundColor: "#137d7e",
          border: "none",
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          justifyContent: "center",
          width: "100%",
          margin: "3em 0",
        },
        groupedHorizontal: {
          "&&:not(:first-child)": {
            borderLeft: "1px solid #102d40",
            borderRight: "1px solid #102d40",
          },
          "&&:first-child": {
            borderRight: "1px solid #102d40",
            borderLeft: "1px solid #102d40",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "input:checked + svg": { fill: "#137d7e" },
          "input + svg": { fill: "#DADADA" },
        },
      },
    },

    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol',
          textTransform: "none",
          borderRadius: 8,
          height: 42,
          border: "1px solid #102d40",
          width: "auto",
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 25,
          paddingRight: 25,
          color: "#102d40",
          "&$selected": {
            backgroundColor: "#137d7e",
            color: "#fff",
            "&&:hover": {
              backgroundColor: "#137d7e",
              color: "#fff",
            },
          },
          "&&:hover": {
            backgroundColor: "#FFF",
            color: "#102d40",
          },
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
