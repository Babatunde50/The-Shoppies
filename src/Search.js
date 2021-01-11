import './Search.css';

const Search = ({ value, searchHandler }) => {
  return (
    <div className="Card">
      <div className="CardInner">
        <label>Search for any movie</label>
        <div className="container">
          <div className="Icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#657789"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-search"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <div className="InputContainer">
            <input className="input" value={value} onChange={searchHandler}  placeholder="captain america..." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search