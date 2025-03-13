import React, { useRef, useState } from "react";
// COMMONS
import ItemListSliderCategoryListMovies from "./itemListSliderCategoryListMovies/ItemListSliderCategoryListMovies";
// STYLES
import {
  RootRow,
  BoxRow,
  TypoTitleListSliderCategoryListMovies,
  BoxRowIndividually,
  styleBiChevronLeft,
  BoxListMovies,
  styleBiChevronRight,
} from "./StylesListSliderCategoryListMovies";
// ICONS
import {
  BiChevronLeft,
  BiChevronRight,
} from "@/app/utils/constants/icons/index";

export default function ListSliderCategoryListMovies({ list }) {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const rowRef = useRef(null);
  const listRef = useRef();

  const handleClick_Btns_Slider_CategoryListMovies = (direction) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const { title, content } = list;

  return (
    <RootRow maxWidth='xl'>
      <BoxRow>
        <TypoTitleListSliderCategoryListMovies variant='h5'>
          {title}
        </TypoTitleListSliderCategoryListMovies>
        <BoxRowIndividually>
          <BiChevronLeft
            size={22}
            style={
              //styleBiChevronLeft,
              {
                bottom: 0,
                backgroundColor: "rgb(22, 22, 22, 0.5)",
                color: "white",
                cursor: "pointer",
                display: !isMoved && "none",
                height: "100%",
                left: 0,
                margin: "auto",
                position: "absolute",
                top: 0,
                width: "50px",
                zIndex: 150,
              }
            }
            onClick={() => handleClick_Btns_Slider_CategoryListMovies("left")}
          />
          <BoxListMovies
            ref={rowRef}
            sx={{
              alignItems: "center",
              display: "flex",
              height: "100%",
              overflow: "hidden",
            }}
          >
            {content
              // .slice(
              //   0,
              //   5
              // )
              .map((item, index) => (
                <ItemListSliderCategoryListMovies key={index} item={item} />
              ))}
          </BoxListMovies>
          <BiChevronRight
            style={styleBiChevronRight}
            onClick={() => handleClick_Btns_Slider_CategoryListMovies("right")}
          />
        </BoxRowIndividually>
      </BoxRow>
    </RootRow>
  );
}
