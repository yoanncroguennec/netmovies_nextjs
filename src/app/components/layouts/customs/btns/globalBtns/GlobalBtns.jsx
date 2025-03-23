import { Tooltip, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

export default function GlobalBtns({
  titleTooltipBtn,
  colorIconBtn,
  marginRightIconBtn,
  urlBtn,
  onClickAction,
  iconBtn,
  textBtn,
}) {

  return (
    <Link href={urlBtn} style={{ textDecoration: "none" }}>
      <Tooltip
        title={
          titleTooltipBtn && (
            <Typography variant='h6'>{titleTooltipBtn}</Typography>
          )
        }
      >
        <motion.div
          onClick={onClickAction}
          style={{
            // boxShadow: "20px 20px 40px -6px rgba(0, 0, 0, .2)",
            // border: "2px solid #F00",
            // display: "flex",
            // flexWrap: "nowrap",
            // justifyContent: "center",
            // alignItems: "center",
            // borderRadius: "50px",
            // cursor: "pointer",
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div
            style={{
              // color: "#FFF",
              color: `${colorIconBtn}`,
              marginRight: marginRightIconBtn,
            }}
          >
            {iconBtn}
          </div>
    
          <Typography
            style={{ color: "#F00", fontWeight: "bold" }}
            variant='h6'
          >
            {textBtn}
          </Typography>
        </motion.div>
      </Tooltip>
    </Link>
  );
}
