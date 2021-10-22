import React, { useEffect } from "react";

const Gallery = ({ data }) => {
  const [selectedIdx, setSelectedIdx] = React.useState();
  console.log(selectedIdx);
  return (
    <div className="grid-flex ">
      <div className="grid-container">
        <div
          className={
            selectedIdx === 0
              ? "selected-image grid-first-item clickable"
              : "grid-first-item clickable"
          }
          onClick={() => setSelectedIdx(0)}
        >
          <img src={data[0].sections[0].images[0].img} />
          <small className="fw-bold">
            {data[0].sections[0].images[0].title}
          </small>
        </div>
        {data[0].sections[0].images
          .filter((item, index) => index != 0)
          .map((el, idx) => {
            return (
              <>
                <div
                  key={el}
                  className={
                    selectedIdx === idx + 1
                      ? "selected-image grid-item clickable"
                      : "grid-item clickable"
                  }
                  onClick={() => setSelectedIdx(idx + 1)}
                >
                  <img src={el.img} />
                  <small className="fw-bold">{el.title}</small>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Gallery;
