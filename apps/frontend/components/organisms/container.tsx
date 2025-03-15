'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
}));

const AppContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 90dvh)',
  minHeight: '100%',
  padding: theme.spacing(4),
}));

export default function Container(props: { children: React.ReactNode }) {
  return (
    <AppContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        {props.children}
      </Card>
    </AppContainer>
  );
}