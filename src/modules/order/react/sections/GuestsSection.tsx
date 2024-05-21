"use client";

import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, FormControl, FormLabel, Grid, TextField, Typography } from '@mui/material';
import { useGuestsSection } from '@ratatouille/modules/order/react/sections/use-guests-section';
import React from 'react'

export const GuestsSection: React.FC<{}> = () => {
  const presenter = useGuestsSection();
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h4">Invités</Typography>
      <Grid sx={{ paddingTop: 2 }} rowSpacing={2}>
        {presenter.form.guests.map((guest) => (
          <Box key={Math.random()}>
            <GuestRow
              id={guest.id}
              firstName={guest.firstName}
              lastName={guest.lastName}
              age={guest.age}
              onChange={presenter.updateGuest}
              remove={presenter.removeGuest}
            />
          </Box>
        ))}
      </Grid>
      <Grid container direction={"row"} alignItems={"center"} spacing={1} marginTop={2}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={presenter.addGuest}>Ajouter</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={presenter.onNext}>Suivant</Button>
        </Grid>
      </Grid>
    </Box>)
}


const GuestRow: React.FC<{
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  onChange: (id: string, key: string, value: any) => void;
  remove: (id: string) => void;
}> = ({
  id,
  firstName,
  lastName,
  age,
  onChange,
  remove,
}
) => {
    return (
      <Box>
        <Grid container direction={"row"} alignItems={"center"} spacing={1}>
          <Grid item>
            <FormControl>
              <FormLabel>Prénom</FormLabel>
              <TextField value={firstName} onChange={(e) => onChange(id, "firstName", e.target.value)} />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <FormLabel>Nom</FormLabel>
              <TextField value={lastName} onChange={(e) => onChange(id, "lastName", e.target.value)} />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <FormLabel>Age</FormLabel>
              <TextField value={age} onChange={(e) => onChange(id, "age", Number.parseInt(e.target.value))} />
            </FormControl>
          </Grid>
          <Box sx={{ marginTop: 2 }}>
            <Button variant="contained" color="primary" startIcon={<DeleteIcon />} onClick={() => remove(id)}>Supprimer</Button>
          </Box>
        </Grid>
      </Box>
    )
  }