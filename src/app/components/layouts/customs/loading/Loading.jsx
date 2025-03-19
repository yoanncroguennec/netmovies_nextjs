// import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

// const override: CSSProperties = {
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Custom_Loading({ loading }) {
  return (
    <ClipLoader
      color='#F00'
      loading={loading}
      cssOverride={override}
      size={200}
      aria-label='Loading Spinner'
      data-testid='loader'
    />
  );
}
