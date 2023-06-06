import NoCaptchaForm from "./forms/NoCaptchaForm";

const SearchBar = ({ values, handleFilter }) => {
  return (
    <div className="search-bar-wrapper">
      <NoCaptchaForm
        data={{ values }}
        submit={handleFilter}
        change={handleFilter}
        type={"search"}
      />
    </div>
  );
};

export default SearchBar;
