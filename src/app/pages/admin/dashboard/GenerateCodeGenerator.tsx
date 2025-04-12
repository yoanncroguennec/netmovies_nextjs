"use client";

import React, { ChangeEvent, useState } from "react";
import QRCode from "react-qr-code";
import { Box, TextField } from "@mui/material";

export default function GenerateCodeGenerator() {
 const [url, setUrl] = useState<string>("");

 function GenerateQR_Code(e: ChangeEvent<HTMLInputElement>): void {
   setUrl(e.target.value);
 }

  return (
      <Box
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          margin: "50px 0",
          width: "100%",
        }}
      >
        <Box
          style={{
            alignItems: "center",
            background: "rgba(255, 255, 255, 1)",
            border: "5px solid #000",
            borderRadius: "25px",
            display: "flex",
            flexDirection: "column",
            height: "400px",
            justifyContent: "space-around",
            padding: "10px",
            width: "300px",
          }}
        >
          <QRCode value={url} style={{ height: "150px", width: "150px" }} />
          <TextField
            onChange={GenerateQR_Code}
            type='text'
            value={url}
            variant='outlined'
          />
        </Box>
      </Box>
  );
}
