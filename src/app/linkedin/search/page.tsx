"use client";
import Loader from "@/components/loader/loader";
import DeleteIcon from "@mui/icons-material/Forward";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { searchFunction } from "./helper";
import styles from "./page.module.css";

export default function Search() {
  const [queryName, setQueryName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [queryResult, setQueryResult] = useState<any[]>();
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const result = await searchFunction(queryName, filter);
    
    setQueryResult(result);
    setLoading(false);
  };

  return (
    <main className={styles.main}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1, width: "50%" }}
      >
        <FormControl sx={{ width: 120, mr: 1 }}>
          <InputLabel id="demo-simple-select-label">Filter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="Age"
            onChange={handleFilterChange}
          >
            <MenuItem value="people">People</MenuItem>
            <MenuItem value="group">Group</MenuItem>
          </Select>
        </FormControl>
        <TextField
          required
          id="username"
          label="Enter username"
          name="username"
          autoComplete="username"
          autoFocus
          value={queryName}
          onChange={(event) => setQueryName(event.target.value)}
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
                    <Link href={item.linkedinLink}>
                      <DeleteIcon />
                    </Link>
                  </IconButton>
                }
                key={item.linkedinLink}
              >
                <Avatar>
                  {item.imgLink && <Image src={item.imgLink} alt={item.name} unoptimized width={64} height={64}/>}
                </Avatar>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Grid>
      )}
    </main>
  );
}
