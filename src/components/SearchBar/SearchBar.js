import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Paper, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

const searchOptions = [
  {
    id: 0,
    title: "HomePage",
    isHome: true,
    sections: [
      { id: 1, title: "All", isSection: true },
      { id: 2, title: "Section 1", isSection: true },
      { id: 3, title: "Section 2", isSection: true }
    ]
  },
  {
    id: 4,
    title: "Page 2",
    isSecondPage: true,
    sections: []
  }
];

const SearchBar = () => {
  const [searchResult, setSearchResult] = React.useState("");
  const [selectedIdx, setSelectedIdx] = React.useState(-1);
  const [showResults, setShowResults] = React.useState(false);

  const location = useLocation();
  const optionsHistory = useHistory();

  React.useEffect(() => {
    if (location) {
      setSearchResult("");
    }
  }, [location]);

  const onSearch = e => {
    setSearchResult(e.target.value);
    e.target.value !== '' ? setShowResults(true) : setShowResults(false);
  };

  const navigateToOption = () => {
    switch (searchResult) {
      case searchOptions[0].title: case searchOptions[0].sections[0].title:
        optionsHistory.push("/home");
        break;
      case searchOptions[0].sections[1].title:
        optionsHistory.push("/home/1");
        break;
      case searchOptions[0].sections[2].title:
        optionsHistory.push("/home/2");
        break;
      case searchOptions[1].title:
        optionsHistory.push("/page2");
        break;
      default:
        return;
    }
    setSearchResult("");
  };

  const setSelectedResult = searchTerm => {
    setSelectedIdx(searchTerm.id);
    setSearchResult(searchTerm.title);
  };

  return (
    <>
      <div className="search">
        <div className="search-text">
          <input
            type="text"
            onChange={onSearch}
            placeholder="Search here.."
            value={searchResult}
            className="search-text"
          />
          <SearchIcon
            className="clickable icon"
            onClick={() => {
              navigateToOption();
            }}
          />
        </div>
      </div>
      {showResults && (
        <>
          <Paper className="search-paper" onMouseLeave={() => setShowResults(false)}
          >
            {searchOptions.map((item, idx) => {
              return (
                <div key={idx}>
                  <Typography
                    variant="h6"
                    key={idx}
                    className={
                      selectedIdx === item.id ? "selected-search-item" : ""
                    }
                  >
                    <div
                      className="fw-bold fs-14 clickable p-8"
                      onClick={() => setSelectedResult(item)}
                    >
                      {item.title}
                    </div>
                  </Typography>
                  {item.sections.length > 0 &&
                    item.sections.map((el, index) => {
                      return (
                        <Typography
                          variant="h6"
                          key={index}
                          className={
                            selectedIdx === el.id ? "selected-search-item" : ""
                          }
                        >
                          <div
                            className="fw-bold fs-14 ml-25 clickable"
                            onClick={() => setSelectedResult(el)}
                          >
                            {el.title}
                          </div>
                        </Typography>
                      );
                    })}
                </div>
              );
            })}
          </Paper>
        </>
      )}

    </>
  );
};

export default SearchBar;
