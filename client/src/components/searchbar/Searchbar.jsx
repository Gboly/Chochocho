import "./searchbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Searchbar({
  searchText,
  handleChange,
  iconStyle,
  style,
  placeholder,
  maxWidth,
}) {
  return (
    <div className="searchbar" style={{ maxWidth }}>
      <input
        type="text"
        name="search"
        id=""
        value={searchText}
        onChange={handleChange}
        placeholder={placeholder}
        style={style || {}}
      />
      <i style={iconStyle || {}}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </i>
    </div>
  );
}
