import React, { useEffect } from "react";
import Menu from "./Menu/Menu";
import BusinessNeeds from "./Sections/SecondSection/BusinessNeeds";
import Gallery from "./Sections/FirstSection/Gallery";
import Info from "./Sections/FirstSection/Info";
import { useHistory } from "react-router-dom";
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
  let currentPath = history.location.pathname;

  const [homeData, setHomeData] = React.useState([]);
  const [pageData, setPageData] = React.useState([]);
  const [menuData, setMenuData] = React.useState([]);
  const [stepData, setStepData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [currentSection, setCurrentSection] = React.useState(0);
  const [currentStepSlider, setCurrentStepSlider] = React.useState(0);
  const [currentStepTitle, setCurrentStepTitle] = React.useState(0);

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
      } catch (error) {
        setError(error);
      }
    })();
  }, []);

  useEffect(() => {
    switch (currentPath) {
      case '/home': case '/home/1':
        setCurrentStepTitle(0);
        setCurrentStepSlider(0);
        setCurrentSection(0);
        break;
      case '/home/2':
        setCurrentStepTitle(0);
        setCurrentStepSlider(0);
        setCurrentSection(1);
        break;
      case '/page2':
        setCurrentStepTitle(1);
        setCurrentStepSlider(0);
        setCurrentSection(0);
        break;
      default:
        return;
    }
  }, [currentPath])

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
      {(isLoading || error) && (
        <div className="loadingIcon">
          <img src={loading} alt=""></img>
        </div>
      )}
      {!isLoading && !error && (
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
              <div>
                <Typography variant="h4" className="gallery-title mt-25">{homeData[0]?.description}</Typography>
                <div className=" sections nav-item">
                  <DotStepper
                    isMenu={false}
                    isSection
                    steps={sections}
                    handleStep={setCurrentSection}
                    activeStep={currentSection}
                  />
                </div>
                <div style={{ width: '20%' }}></div>
              </div>
              {/* First item will start on row 2 and column 1, and span 2 rows and 2 columns */}
              {hasImages &&
                homeData[0].sections.find(
                  (el, idx) => idx === 0 && currentSection === 0
                ) && <Gallery data={homeData} />}

              {homeData[0].sections.length > 0 &&
                homeData[0].sections.find(
                  (el, idx) => idx === 1 && currentSection === 1
                ) && <Info data={homeData} />}
            </>
          ) : (
            <>
              {pageData.length && pageData[0].tiles.length > 0 && (
                <>
                  <Typography variant="h4" className="business-title">
                    {pageData[0]?.description}
                  </Typography>
                  <div className="card-flex">
                    <BusinessNeeds businessData={pageData[0].tiles} />
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
