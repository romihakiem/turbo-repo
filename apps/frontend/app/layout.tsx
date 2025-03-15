'use client';
import * as React from 'react';
import { Provider } from "react-redux";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme/theme';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import store from "@/store/store";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            {props.children}
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
