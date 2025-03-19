import { Box } from "@mui/material";
import {
  Featured,
  ListSliderCategoryListMovies,
} from "@/app/components/common";
// LAYOUTS
import Container_GlobalApp from "@/app/components/layouts/containers/container_GlobalApp/Container_GlobalApp";
// DTAS
import data_HorizontalMovieList from "@/app/utils/constants/data/components/screens/home/data_HorizontalMovieList";

export default function HomePage() {

  return (
    <Container_GlobalApp>
      <Box sx={{ background: "#000", overflow: "hidden" }}>
        <Featured />

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
