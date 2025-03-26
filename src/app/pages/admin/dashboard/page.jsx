import {
  DashBoard_CircularProgressbar,
  NewsMovies,
  DashboardWidgets,
} from "../../../components/common";
import Container_Admin from "../../../components/layouts/containers/container_Admin/Container_Admin";
// import WebRadioPage from "../webradios/page"

export default function DashboardPage() {
  // return <WebRadioPage />
  return (
    <Container_Admin>
      <div>
        <div style={{ display: "flex", gap: "20px" }}>
          <DashboardWidgets type='user' />
          <DashboardWidgets type='movies' />
          <DashboardWidgets type='categoryMovies' />
        </div>
        <div
          style={{
            display: "flex",
            padding: "20px",
            gap: "20px",
          }}
        >
          <DashBoard_CircularProgressbar />
        </div>
        <div
          style={{
            alignItems: "center",
            boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
            display: "flex",
            justifyContent: "center",
            margin: "15px 90px",
            height: "45vh",
            WebkitBoxShadow: "2px 4px 10px 1px rgba(0, 0, 0, 0.47)",
            width: "90%",
          }}
        >
          <NewsMovies />
        </div>
      </div>
    </Container_Admin>
  );
}
