import { FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { AiTwotoneFileExclamation } from "react-icons/ai";


export const admin_dataDrawerNavAdmin = [
  {
    path: "/pages/admin/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/pages/users",
    name: "Utilisateurs",
    icon: <FaUser />,
    subRoutes: [
      {
        path: "/pages/admin/listUsers",
        name: "Liste Utilisateurs ",
        icon: <FaUser />,
      },
      {
        path: "/pages/admin/newUser",
        name: "Nouvel utilisateur",
        icon: <FaUser />,
      },
      {
        path: "/pages/admin/userLocation_And_IP_Address",
        name: "Localisation users avec adresse IP",
        icon: <FaUser />,
      },
    ],
  },
  {
    path: "/file-manager",
    name: "Films / Catégories",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/pages/admin/movies",
        name: "Liste films ",
        icon: <FaUser />,
      },
      {
        path: "/pages/admin/movies/newMovie",
        name: "Nouveau film",
        icon: <FaLock />,
      },
      {
        path: "/pages/admin/movies/listCategories",
        name: "Liste Catégories de films",
        icon: <FaMoneyBill />,
      },
      {
        path: "/pages/admin/movies/newCategories",
        name: "Nouvelle Catégorie de films",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/file-manager",
    name: "WebRadios",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/pages/admin/webRadios",
        name: "Liste webRadios ",
        icon: <FaUser />,
      },
      {
        path: "/pages/admin/webRadios/newWebRadio",
        name: "Nouveau webRadios",
        icon: <FaLock />,
      },
    ],
  },
  {
    path: "",
    name: "Statistiques",
    icon: <MdMessage />,
    subRoutes: [
      {
        path: "/pages/admin/line_ChartJs/statics_movies_and_listcategoryMovies",
        name: "Line - Films / catégories de films",
        icon: <FaUser />,
      },
      {
        path: "/pages/admin/bar_ChartJs/statics_movies_and_listcategoryMovies",
        name: "Barres - Films / catégories de films",
        icon: <FaLock />,
      },
    ],
  },
  {
    path: "/messages",
    name: "Messages",
    icon: <MdMessage />,
  },
];
