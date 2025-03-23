"use client";

import { useState } from "react";
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import NavbarAdmin from "../../admin/navbarAdmin/NavbarAdmin";
import { BsFillShareFill } from "react-icons/bs";
import DrawerNavigationAdmin from "../../admin/drawerAdmin/DrawerAdmin";

const baseURL = "/assets/imgs/admin/layouts";

const backgroundImageUrl_1 = `${baseURL}/imgBG_Admin1.jpg`;
const backgroundImageUrl_2 = `${baseURL}/imgBG_Admin2.jpg`;
const backgroundImageUrl_3 = `${baseURL}/imgBG_Admin3.jpeg`;
const backgroundImageUrl_4 = `${baseURL}/imgBG_Admin4.jpeg`;
const backgroundImageUrl_5 = `${baseURL}/imgBG_Admin5.webp`;
const backgroundImageUrl_6 = `${baseURL}/imgBG_Admin6.webp`;

const actions = [
  // { icon: "<FileCopyIcon />", name: <Generate_QR_Code /> },
  // { icon: <SaveIcon />, name: "Save" },
  // { icon: <PrintIcon />, name: "Print" },
  { icon: <BsFillShareFill size={35} />, name: "Share" },
];

export default function Container_Admin({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box style={{ display: "flex", flexWrap: "nowrap", width: "100vw" }}>
      <DrawerNavigationAdmin isOpen={isOpen} setIsOpen={setIsOpen} />

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: isOpen ? "90vw" : "98vw",
        }}
      >
        <NavbarAdmin />
        <Box
          sx={{
            width: "100%",
            height: "100%",
            color: "#FFF",
            overflow: "hidden",
            backgroundImage: `url(${backgroundImageUrl_1})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            justifyContent: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            animation: "changeBgDrawerAdmin 55s infinite ease-in-out",
            "@keyframes changeBgDrawerAdmin": {
              "20%": {
                backgroundImage: `url(${backgroundImageUrl_2})`,
              },

              "40%": {
                backgroundImage: `url(${backgroundImageUrl_3})`,
              },

              "60%": {
                backgroundImage: `url(${backgroundImageUrl_4})`,
              },

              "80%": {
                backgroundImage: `url(${backgroundImageUrl_5})`,
              },

              "100%": {
                backgroundImage: `url(${backgroundImageUrl_6})`,
              },
            },
          }}
        >
          {children}
        </Box>
      </Box>
      {/* <SpeedDial
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            // TooltipClasses={classes}
          />
        ))}
      </SpeedDial> */}
    </Box>
  );
}
