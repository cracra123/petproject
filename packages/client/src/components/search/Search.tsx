import { FC, useEffect, useRef, useState } from "react";
import "./Search.css";
import { apiAxios } from "../axios/apiAxios";

interface Profile {
  id: number;
  login: string;
}

const Search: FC = ({}) => {
  const [input, setInput] = useState<string>("");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [inputActive, setInputActive] = useState<boolean>(false);

  useEffect(() => {
    if (input) {
      const searchUsers = async (input: string) => {
        const { data } = await apiAxios.post("/search", { input });
        setProfiles(data);
      };
      searchUsers(input);
    } else {
      setProfiles([]);
    }
  }, [input, setInput]);
  console.log(profiles);
  return (
    <div className="search">
      <div className="search-align">
        <div className="search-input">
          <input
            onFocus={() => setInputActive(true)}
            onBlur={() => setInputActive(false)}
            type="text"
            value={input}
            placeholder="🔍Поиск"
            onChange={(e) => setInput(e.target.value)}
          ></input>
          {inputActive && (
            <div className="search-bar">
              {profiles.map((elem) => (
                <div className="search-profile-bar">{elem.id}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Search;
