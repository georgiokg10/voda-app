import React, { useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import DotStepper from "../../common/components/DotStepper";

const Home = ({ menuData, stepData }) => {
  const [currentStepSlider, setCurrentStepSlider] = React.useState(0);
  const [currentStepTitle, setCurrentStepTitle] = React.useState(0);

  return (
    <>
      <div className="options">
        {menuData.length > 0 && (
          <>
            <DotStepper
              isMenu
              isSection={false}
              steps={menuData}
              handleStep={setCurrentStepTitle}
              activeStep={currentStepTitle}
            />
          </>
        )}
        <SearchBar />
      </div>
      <div className="slider">
        {stepData.length > 0 && (
          <DotStepper
            isMenu={false}
            isSection={false}
            steps={stepData}
            handleStep={setCurrentStepSlider}
            activeStep={currentStepSlider}
          />
        )}
      </div>
    </>
  );
};

export default Home;
