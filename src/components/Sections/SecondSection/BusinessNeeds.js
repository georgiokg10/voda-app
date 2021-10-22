import React from "react";
import { Typography, Paper } from "@material-ui/core";

const BusinessNeeds = ({ businessData }) => {
  const [selectedIdx, setSelectedIdx] = React.useState(-1);

  return (businessData.map((item, idx) =>
    <div className="business-section clickable" key={idx}>
      <Paper className={selectedIdx === idx ? 'selected-business-item item textCenter' : 'item textCenter'} onClick={() => setSelectedIdx(idx)}>
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
          <span className={selectedIdx === idx ? 'selected-business-item' : ''}>{item.link}</span>
        </Typography>
      </Paper>
    </div >
  ))

};

export default BusinessNeeds;
