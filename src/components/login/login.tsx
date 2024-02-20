"use client";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState } from "react";

interface LoginType {
  username: string;
  password: string;
}
async function loginQueryForLinked(data: LoginType, router: any) {
  const formData = new URLSearchParams();
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      formData.append(key, data[key as keyof LoginType]);
    }
  }
  fetch("http://localhost:3030/search/auth", {
    method: "POST",
    body: formData,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      router.push("/linkedin/search");
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
}

async function loginQueryForInstagram(data: LoginType, router: any) {
  const formData = new URLSearchParams();

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      formData.append(key, data[key as keyof LoginType]);
    }
  }

  fetch("http://localhost:3030/accounts/auth", {
    method: "POST",
    body: formData,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      router.push("/instagram/accounts");
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function LoginComponent() {
  const [loginData, setLoginData] = useState<LoginType>({
    username: "",
    password: "",
  });
  const [socialMedia, setSocialMedia] = useState<string | null>("insta");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setSocialMedia(newAlignment);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    if (socialMedia === "linked") {
      loginQueryForLinked(loginData, router);
    }
    if (socialMedia === "insta") {
      loginQueryForInstagram(loginData, router);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={loginData.username}
            onChange={(event) =>
              setLoginData({ ...loginData, username: event.target.value })
            }
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginData.password}
            onChange={(event) =>
              setLoginData({ ...loginData, password: event.target.value })
            }
            disabled={loading}
          />
          <ToggleButtonGroup
            value={socialMedia}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            fullWidth
            disabled={loading}
          >
            <ToggleButton
              value="insta"
              aria-label="left aligned"
              color="success"
            >
              <Image src="/insta.png" width={32} height={32} alt="insta" />
            </ToggleButton>
            <ToggleButton
              value="linked"
              aria-label="right aligned"
              color="primary"
            >
              <Image src="/linked.png" width={32} height={32} alt="linked" />
            </ToggleButton>
          </ToggleButtonGroup>

          <FormControlLabel
            disabled={loading}
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
