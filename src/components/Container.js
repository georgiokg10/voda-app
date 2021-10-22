import React, { useEffect } from "react";
import Menu from "./Menu/Menu";
import BusinessNeeds from "./Sections/SecondSection/BusinessNeeds";
import Gallery from "./Sections/FirstSection/Gallery";
import Info from "./Sections/FirstSection/Info";
import { useLocation, useHistory } from "react-router-dom";
import {
  getHomeData,
  getPageData,
  getMenuData,
  getSliderData
} from "../common/utils/services";
import DotStepper from "../common/components/DotStepper";
import { sections } from "../common/constants/constants";
import Typography from "@material-ui/core/Typography";
import loading from "../assets/images/loading.gif";

const Container = () => {
  let history = useHistory();
  const currentVal = history.location.pathname === "/home" ? 0 : 1;

  const [homeData, setHomeData] = React.useState([]);
  const [pageData, setPageData] = React.useState([]);
  const [menuData, setMenuData] = React.useState([]);
  const [stepData, setStepData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [currentSection, setCurrentSection] = React.useState(0);
  const [currentStepSlider, setCurrentStepSlider] = React.useState(currentVal);
  const [currentStepTitle, setCurrentStepTitle] = React.useState(currentVal);

  useEffect(() => {
    (async () => {
      setError(null);

      try {
        const homeDataResp = await getHomeData();
        const pageDataResp = await getPageData();
        const menuDataResp = await getMenuData();
        const sliderDataResp = await getSliderData();
        if (homeDataResp?.data?.length) {
          setHomeData(homeDataResp.data);
        }
        if (pageDataResp?.data?.length) {
          setPageData(pageDataResp.data);
        }
        if (menuDataResp?.data?.length) {
          setMenuData(menuDataResp.data);
        }
        if (sliderDataResp?.data?.length) {
          setStepData(sliderDataResp.data);
        }
        console.log("homeDataResp", homeDataResp.data);
        console.log("pageDataResp", pageDataResp.data);
        console.log("menuDataResp", menuDataResp.data);
        console.log("sliderDataResp", sliderDataResp.data);
      } catch (error) {
        setError(error);
      }
    })();
  }, []);

  const isLoading =
    !menuData.length &&
    !stepData.length &&
    !homeData.length &&
    !pageData.length;

  const hasImages =
    homeData.length > 0 &&
    homeData[0].sections.length > 0 &&
    homeData[0].sections[0].images.length > 0;

  return (
    <>
      {isLoading && (
        <div className="loadingIcon">
          <img src={loading}></img>
        </div>
      )}
      {!isLoading && (
        <>
          <div className="menu">
            <Menu
              menuData={menuData}
              stepData={stepData}
              currentStepSlider={currentStepSlider}
              setCurrentStepSlider={setCurrentStepSlider}
              currentStepTitle={currentStepTitle}
              setCurrentStepTitle={setCurrentStepTitle}
            />
          </div>
          {currentStepTitle === 0 ? (
            <>
              <div className="sections">
                <Typography variant="h4">h1. Heading</Typography>

                <strong className="title">
                  {homeData[0].sections[0].description}
                </strong>
                <div className="nav-item">
                  <DotStepper
                    isMenu={false}
                    isSection
                    steps={sections}
                    handleStep={setCurrentSection}
                    activeStep={currentSection}
                  />
                </div>
              </div>
              {/* First item will start on row 2 and column 1, and span 2 rows and 2 columns */}
              {hasImages &&
                homeData[0].sections.find(
                  (el, idx) => idx == 0 && currentSection == 0
                ) && <Gallery data={homeData} />}

              {homeData[0].sections.length > 0 &&
                homeData[0].sections.find(
                  (el, idx) => idx == 1 && currentSection == 1
                ) && <Info data={homeData} />}
            </>
          ) : (
            <>
              {pageData.length && pageData[0].tiles.length > 0 && (
                <>
                  <Typography variant="h4" className="business-title">
                    {pageData[0].description}
                  </Typography>
                  <div className="card-flex">
                    {pageData[0].tiles.map((el, idx) => {
                      return <BusinessNeeds item={el} key={idx} />;
                    })}
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Container;
