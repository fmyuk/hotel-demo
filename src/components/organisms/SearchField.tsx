import React, { FC, useState } from "react";
import flex from "styles/utility/flex.module.scss";
import { SearchButton, TextInput } from "components/atoms";
import { useStringChangeEvent } from "lib/customHooks";
import { searchHotels } from "lib/hotels";
import { Hotels } from "types/hotels";
import { useNavigate } from "react-router";

interface Props {
  handleHotels: (fetchedHotels: Hotels) => void;
}

const SearchField: FC<Props> = (props) => {
  const navigate = useNavigate();
  const { handleHotels } = props;

  const [keyword, setKeyword] = useState<string>("");
  const handleKeyword = useStringChangeEvent(setKeyword);

  return (
    <div className={flex.flex__row_center}>
      <TextInput
        onChange={handleKeyword}
        value={keyword}
        type={"text"}
      />
      <SearchButton
        label={"Search"}
        onClick={async () => {
          const hotels = await searchHotels(keyword);
          handleHotels([...hotels]);
          navigate("/hotelList")
        }}
      />
    </div>
  );
};

export default SearchField;