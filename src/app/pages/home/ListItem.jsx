import Image from "next/image";

export default function ListItem({ index }) {

  return (
    <div
      className='listItem'
      style={{
        width: "225px",
        height: "120px",
        background: "#F00",
        marginRight: "5px",
        overflow: "hidden",
        cursor: "pointer",
        color: "white",
      }}
    >
      <Image
        src='https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee'
        width={0}
        height={0}
        sizes='100vw'
        style={{ width: "100%", height: "auto" }} // optional
      />
    </div>
  );
}
