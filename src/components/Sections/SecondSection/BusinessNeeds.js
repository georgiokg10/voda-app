import React, { useEffect } from "react";
import { Card } from "@material-ui/core";
import { Typography } from "@material-ui/core";

const BusinessNeeds = ({ item }) => {
  console.log(item);

  return (
    <div className=" business-section">
      <Card className="item textCenter">
        <div className="mt-25">{item.icon}</div>
        <Typography variant="h5" className="fw-bold mt-25">
          {item.title}
        </Typography>
        <Typography variant="subtitle1" className="mt-25">
          {item.description}
        </Typography>
        <Typography
          variant="subtitle1"
          className="fw-bold mt-25 nav-link-item clickable"
        >
          {item.link} >
        </Typography>
      </Card>
    </div>
  );
};

export default BusinessNeeds;
