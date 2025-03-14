import {
  Typography,
  Breadcrumbs,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
// ICONS
import { MdOutlineNavigateNext } from "@/app/utils/constants/icons/index";

export default function BreadcrumbsMovie({ _id, name }) {
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
      url: "listAllMovies",
    },
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
            underline: "hover",
          }}
        >
          <Typography variant={matches ? "body2 " : "h4"}>{text}</Typography>
        </Link>
      ))}
      {name ? (
        <Link
          href={`${_id}`}
          style={{
            color: "#000",
            cursor: "pointer",
            fontWeight: "bold",
            underline: "hover",
          }}
        >
          <Typography variant={matches ? "body2 " : "h4"}>
            Film : {name}
          </Typography>
        </Link>
      ) : (
        ""
      )}
    </Breadcrumbs>
  );
}
