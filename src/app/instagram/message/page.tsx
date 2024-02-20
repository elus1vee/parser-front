"use client";
import Loader from "@/components/loader/loader";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { sendMessage } from "./helper";
import styles from "./page.module.css";

export default function Home() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messageRequest, setMessageRequest] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setMessageRequest("");
    event.preventDefault();
    setLoading(true);
    const result = await sendMessage(username, message);
    setMessageRequest(result.message)
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
        <TextField
          required
          id="username"
          label="Enter username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          sx={{
            width: "30%",
            mr: 1,
          }}
        />
        <TextField
          required
          id="message"
          label="Message"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          sx={{
            width: "50%",
            mr: 1,
          }}
        />
        <Button type="submit" variant="contained" sx={{ mt: 1 }}>
          Send
        </Button>
      </Box>
      {loading && <Loader/>}
      {!loading && messageRequest && (
        <p style={{color: "green", fontSize: "24px", textAlign: "center"}}>{messageRequest}</p>
      )}
    </main>
  );
}
