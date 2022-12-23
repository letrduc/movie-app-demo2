import React from "react";

import { useNavigate } from "react-router-dom";
import Form from "../components/Pages/Form/Form";
import Stack from "@mui/material/Stack";

function Login() {
  let navigate = useNavigate();
  let from = navigate.state?.from?.pathname || "/";

  return (
    <Stack sx={{ p: 4, alignItems: "center" }}>
      <Form
        callback={() => {
          navigate(from, { replace: true });
        }}
      />
    </Stack>
  );
}

export default Login;
