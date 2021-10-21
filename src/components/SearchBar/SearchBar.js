import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import SearchIcon from "@material-ui/icons/Search";
import { Paper } from "@material-ui/core";
import { Col } from "react-bootstrap";
import { getArticles } from "../../common/utils/services";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

const searchOptions = [
  {
    id: 0,
    title: "HomePage",
    sections: ["All", "Section 1", "Section 2"]
  }
];

const SearchBar = () => {
  const [searchResult, setSearchResult] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [error, setError] = React.useState(null);
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

  const navigateToOption = option => {
    setSelectedOption(option);
    // optionsHistory.push(`/article/${article.id}`);
    setSearchResult("");
  };

  return (
    <div>
      <Form.Row>
        <Col className="search">
          <InputGroup className="search-text">
            <Form.Control
              type="text"
              value={searchResult}
              placeholder="Search here.."
              onChange={onSearch}
            />
            <InputGroup.Prepend>
              <InputGroup.Text>
                <SearchIcon className="clickable" />
              </InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>
        </Col>
      </Form.Row>
    </div>
  );
};

export default SearchBar;
