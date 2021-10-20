import React, { useEffect } from "react";
import Home from './Home/Home';
import Sections from './Sections/Sections';
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getHomeData, getPageData, getMenuData, getSliderData } from "../common/utils/services";

const Container = () => {

    const [homeData, setHomeData] = React.useState([]);
    const [pageData, setPageData] = React.useState([]);
    const [menuData, setMenuData] = React.useState([]);
    const [stepData, setStepData] = React.useState([]);
    const [error, setError] = React.useState(null);
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
                    setHomeData(homeDataResp.data)
                }
                if (pageDataResp?.data?.length) {
                    setPageData(pageDataResp.data)
                }
                if (menuDataResp?.data?.length) {
                    setMenuData(menuDataResp.data)
                }
                if (sliderDataResp?.data?.length) {
                    setStepData(sliderDataResp.data)
                }
                console.log('homeDataResp', homeDataResp.data)
                console.log('pageDataResp', pageDataResp.data)
                console.log('menuDataResp', menuDataResp.data)
                console.log('sliderDataResp', sliderDataResp.data)

            } catch (error) {
                setError(error);
            }
        })()
    }, [location.pathname])

    const isLoading = !menuData.length && !stepData.length;

    return (
        <>
            {!isLoading && (
                <>
                    <div className="menu">
                        <Home menuData={menuData} stepData={stepData} />
                    </div>
                    <div>
                        <Sections />
                    </div>
                </>
            )}

        </>

    );
};

export default Container;
