import React, { useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import DotStepper from "../../common/components/DotStepper";
import { useHistory, useLocation } from "react-router-dom";

const Menu = props => {
  let location = useLocation();
  let history = useHistory();

  const {
    menuData,
    stepData,
    setCurrentStepTitle,
    setCurrentStepSlider,
    currentStepTitle,
    currentStepSlider
  } = props;

  const updatePath = idx => {
    history.push(idx === 0 ? "/home" : "/page2");
  };

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
              updatePath={updatePath}
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
            updatePath={updatePath}
          />
        )}
      </div>
    </>
  );
};

export default Menu;
