"use client";
import Loader from "@/components/loader/loader";
import DeleteIcon from "@mui/icons-material/Forward";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useState } from "react";
import { searchFunction } from "./helper";
import styles from "./page.module.css";

export default function Accounts() {
  const [loading, setLoading] = useState<boolean>(false);
  const [queryResult, setQueryResult] = useState<any[]>();
  const [filter, setFilter] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const result = await searchFunction(filter);

    setQueryResult(result);
    setLoading(false);
  };

  return (
    <main className={styles.main}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          mt: 1,
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          required
          id="search"
          label="Search"
          name="search"
          autoComplete="search"
          autoFocus
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          sx={{
            width: "50%",
            mr: 1,
          }}
        />
        <Button type="submit" variant="contained" sx={{ mt: 1 }}>
          Search
        </Button>
      </Box>
      {loading && (
        <Box
          sx={{
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </Box>
      )}
      {queryResult?.length && !loading && (
        <Grid item xs={12} md={6}>
          <List>
            {queryResult?.map((item: any) => (
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <Link href={item}>
                      <DeleteIcon />
                    </Link>
                  </IconButton>
                }
                key={item}
              >
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Grid>
      )}
    </main>
  );
}
