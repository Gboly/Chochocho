import "./search-bar.css";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function SearchBar() {
  return (
    <>
      <i className="rightbar-search-icon">
        <SearchOutlinedIcon
          style={{
            fontSize: "inherit",
            color: "inherit",
            fontWeight: "inherit",
          }}
        />
      </i>
      <input
        type="text"
        placeholder="Search friends"
        className="rightbar-search-input"
      />
    </>
  );
}
