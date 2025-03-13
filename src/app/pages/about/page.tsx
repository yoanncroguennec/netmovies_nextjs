import { Metadata } from "next";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <Box>
      <Typography
        sx={{
          color: "#F0F",
          fontWeight: "bold",
          textAlign: "center",
          padding: "30px 0",
        }}
        variant='h4'
      >
        A propos du site internet
      </Typography>
      <Typography variant='h6'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit,
        blanditiis dolorum dicta architecto excepturi id! Delectus voluptatibus
        neque fugiat adipisci velit quaerat nobis nesciunt, quidem rerum
        similique provident, dignissimos expedita inventore? Sequi reprehenderit
        numquam eos id esse Repellendus, illum impedit nesciunt quisquam, eum
        veniam earum delectus laborum velit quos quod minima corporis placeat
        architecto facilis, omnis itaque. Quibusdam inventore incidunt rem
        laboriosam officia voluptatibus. Molestias, distinctio maiores soluta
        voluptates laborum a. Nihil, nam facere delectus sunt aspernatur
        adipisci? Unde officiis molestias non magni error doloribus eaque porro
        exercitationem sed, fugiat consequatur corrupti ratione ad ipsum
        excepturi quia, rem libero ipsam, laborum provident! Sint nam autem id
        quas, vel repellendus. Repellat, itaque earum veritatis, deserunt soluta
        dolorem eaque quia voluptate in accusamus labore quis id, minima animi
        eius cum impedit cumque aliquam architecto nulla. Voluptates explicabo
        commodi iure quisquam quaerat. Tempore neque atque sequi quae, dolores,
        fuga hic voluptatum eos debitis cupiditate rerum, aperiam harum quod
        voluptates in. Dolorem asperiores, odit, at enim laboriosam illo
        deleniti pariatur dolor doloremque omnis expedita reprehenderit
        molestias officiis nulla sunt sapiente ex culpa non blanditiis? Eos
        quibusdam, doloribus dignissimos, sapiente aperiam ullam sunt alias
        dolorem, porro optio ex necessitatibus illum a asperiores deserunt sequi
        perferendis temporibus unde mollitia! Odit maiores corrupti nisi. Nobis
        aut iste ipsa pariatur nostrum?
      </Typography>
      <Link href={"/"}>
        <Typography
          sx={{
            color: "#F0F",
            fontWeight: "bold",
            padding: 10,
            textAlign: "center",
          }}
          variant='h3'
        >
          Accueil
        </Typography>
      </Link>
      <Link href={"/pages/privacyPolicy"}>
        <Typography
          sx={{
            color: "#F0F",
            fontWeight: "bold",
            padding: 5,
            textAlign: "center",
          }}
          variant='h3'
        >
          privacyPolicy
        </Typography>
      </Link>
    </Box>
  );
}
