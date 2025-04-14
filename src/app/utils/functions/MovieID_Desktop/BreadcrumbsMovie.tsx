import {
  Typography,
  Breadcrumbs,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
// ICONS
import { MdOutlineNavigateNext } from "react-icons/md";

export default function BreadcrumbsMovie({  }) {
  /// RESPONSIVE
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const dataBreadcrumbsMovie = [
    {
      text: "Accueil",
      url: "/pages/home",
    },
    {
      text: "Catalogue de fims",
      url: "/pages/movies",
    },
    // {
    //   text: "TEST",
    //   url: "#",
    // },
  ];

  return (
    <Breadcrumbs
      aria-label='breadcrumbs'
      maxItems={3}
      separator={
        <MdOutlineNavigateNext color='#000' size={matches ? 15 : 45} />
      }
      style={{
        textShadow:
          "5px 0 #f00, -1px 0 #F00, 0 Fpx #F00, 0 -2px #F00, 1px 1px #F00, -1px -1px #F00, 1px -1px #F00, -1px 1px #F00",
      }}
    >
      {dataBreadcrumbsMovie.map(({ text, url, id }) => (
        <Link
          href={url}
          key={id}
          style={{
            color: "#000",
            cursor: "pointer",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          <Typography variant='h5'>{text}</Typography>
        </Link>
      ))}
      {/* {name ? (
        <Link href={`${id}`} style={{ color: "#000", cursor: "pointer" }}>
          <Typography variant='h3'>Film : {name}</Typography>
        </Link>
      ) : (
        ""
      )} */}
    </Breadcrumbs>
  );
}
