import { FC, useEffect, useState } from "react";
import "./Search.css";
import { apiAxios } from "../axios/apiAxios";

interface Profile {
  id: number;
  login: string;
}

const Search: FC = ({}) => {
  const [input, setInput] = useState<string>("");
  const [profiles, setProfiles] = useState<Profile[]>([]);

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
            value={input}
            placeholder="🔍Поиск"
            onChange={(e) => setInput(e.target.value)}
          ></input>
        </div>
      </div>
    </div>
  );
};
export default Search;
