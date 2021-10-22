import React, { useEffect } from "react";
import { Card } from "@material-ui/core";
import { Typography, Slider } from "@material-ui/core";
import ContactForm from "./ContactForm";
import { coloredGraph } from "../../../common/constants/constants";

const Info = ({ data }) => {
  const filteredData = data[0].sections[1];

  console.log(filteredData);
  return (
    <>
      <div className="card-flex">
        <Card className="section-card-item">
          <Typography variant="h5" className="fw-bold">
            {filteredData.graphText}
          </Typography>
          <div className="mt-45">
            {filteredData.stats.map((el, idx) => {
              return (
                <>
                  <div className="graph-item">
                    <Typography variant="h6" className="fw-bold">
                      {el.title}
                    </Typography>
                    <Typography variant="subtitle1" className="fw-bold">
                      {el.amount / 10}%
                    </Typography>
                  </div>

                  <Slider
                    value={el.amount / 10}
                    aria-label="Default"
                    style={{ color: coloredGraph[idx].color }}
                    valueLabelDisplay="auto"
                    disabled
                  />
                </>
              );
            })}
          </div>
        </Card>
        <Card className="section-card-item textCenter">
          <ContactForm formData={filteredData} />
        </Card>
      </div>
    </>
  );
};

export default Info;
