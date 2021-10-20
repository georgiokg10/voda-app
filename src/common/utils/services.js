import { API } from "../../api/index";
import axios from "axios";

const getHomeData = () => {
  return axios.get(`${API}/home`);
};

const getPageData = () => {
  return axios.get(`${API}/page`);
};

const getMenuData = () => {
  return axios.get(`${API}/menu`);
};

const getSliderData = () => {
  return axios.get(`${API}/slider`);
};

export { getHomeData, getPageData, getMenuData, getSliderData };