import { Box, Typography } from "@mui/material";
import {
  Featured,
  ListSliderCategoryListMovies,
} from "@/app/components/common";
// import { authOptions } from "../../api/auth/[...nextauth]"
// LAYOUTS
import Container_GlobalApp from "@/app/components/layouts/containers/container_GlobalApp/Container_GlobalApp";
// DTAS
import data_HorizontalMovieList from "@/app/utils/constants/data/screens/home/data_HorizontalMovieList";
// import { getServerSession } from "next-auth";

export default async function HomePage() {
  // const session = await getServerSession(authOptions);

  return (
    <Container_GlobalApp>
      <Box sx={{ background: "#000", overflow: "hidden" }}>
        <Featured />
        <Typography sx={{ color: "#FFF", fontWeight: "bold" }} variant='h6'>
          {/* LOPPPP /// {session?.user?.email} ---- */}
        </Typography>
        {data_HorizontalMovieList.map(({ titleSection, endPointUrl }) => (
          <ListSliderCategoryListMovies
            titleSection={titleSection}
            endPointUrl={endPointUrl}
          />
        ))}
      </Box>
    </Container_GlobalApp>
  );
}
