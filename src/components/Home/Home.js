import React, { useEffect } from "react";
import Menu from '../Menu/Menu';
import DotStepper from '../../common/components/DotStepper';
import { Container, Row, Col } from 'react-bootstrap';

const Home = ({ menuData, stepData }) => {

  const [currentStep, setCurrentStep] = React.useState(0);

  return (
    <>
      <div className="menu title" >
        {menuData.length > 0 && menuData.map((item, idx) => {
          return (
            <Menu key={idx} menu={item} />
          )
        })}

      </div>
      <div className="slider" >
        {stepData.length > 0 && <DotStepper steps={stepData} handleStep={setCurrentStep} activeStep={currentStep} />}
      </div>
    </>

  );
};

export default Home;
