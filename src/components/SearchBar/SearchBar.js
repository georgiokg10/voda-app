import React from "react";
import { Form, InputGroup } from "react-bootstrap";
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
  const [options, setOptions] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [selectedIdx, setSelectedIdx] = React.useState(-1);
  const [selectedOption, setSelectedOption] = React.useState(null);

  const location = useLocation();
  const optionsHistory = useHistory();

  React.useEffect(() => {
    if (location) {
      setSearchResult("");
    }
  }, [location]);

  const onSearch = e => {
    setSearchResult(e.target.value);
  };

  const navigateToOption = () => {
    const path = optionsHistory.location.pathname;
    switch (path) {
      case "HomePage":
        optionsHistory.push("/home");
      case "Page2":
        optionsHistory.push("/page2");
    }
    setSearchResult("");
  };

  const setSelectedResult = searchTerm => {
    setSelectedIdx(searchTerm.id);
    setSearchResult(searchTerm.title);
  };

  return (
    <div>
      <Form.Row>
        <div className="search">
          <InputGroup className="search-text">
            <Form.Control
              type="text"
              value={searchResult}
              placeholder="Search here.."
              onChange={onSearch}
            />
            <InputGroup.Prepend>
              <InputGroup.Text>
                <SearchIcon
                  className="clickable"
                  onClick={() => {
                    navigateToOption();
                  }}
                />
              </InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>
        </div>
      </Form.Row>
      <Paper className="search-paper">
        {searchOptions.map((item, idx) => {
          return (
            <>
              <Typography
                variant="h6"
                key={idx}
                className={
                  selectedIdx === item.id ? "selected-search-item" : ""
                }
              >
                <div
                  className="fw-bold fs-14 clickable"
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
            </>
          );
        })}
      </Paper>
    </div>
  );
};

export default SearchBar;
