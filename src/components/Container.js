import React, { useEffect } from "react";
import Home from "./Home/Home";
import Section from "./Section/Section";
import { useLocation } from "react-router-dom";
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

const Container = () => {
  const [homeData, setHomeData] = React.useState([]);
  const [pageData, setPageData] = React.useState([]);
  const [menuData, setMenuData] = React.useState([]);
  const [stepData, setStepData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [currentSection, setCurrentSection] = React.useState(0);
  const location = useLocation();

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
  }, [location.pathname]);

  const isLoading =
    !menuData.length &&
    !stepData.length &&
    !homeData.length &&
    !pageData.length;
  const hasImages =
    homeData.length > 0 &&
    homeData[0].sections.length > 0 &&
    homeData[0].sections[0].images.length > 0;

  console.log(sections);

  return (
    <>
      {!isLoading && (
        <>
          <div className="menu">
            <Home menuData={menuData} stepData={stepData} />
          </div>

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
          {hasImages && (
            <div className="grid-flex ">
              <div className="grid-container">
                <div className="grid-first-item">
                  <img src={homeData[0].sections[0].images[0].img} />
                  <div className="title">
                    {homeData[0].sections[0].images[0].title}
                  </div>
                </div>
                {homeData[0].sections[0].images
                  .filter((item, index) => index != 0)
                  .map((el, idx) => {
                    return (
                      <>
                        <div className="grid-item" key={idx}>
                          <img src={el.img} />
                          <div className="title">{el.title}</div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Container;
