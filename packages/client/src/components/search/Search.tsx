import { FC, useEffect, useRef, useState } from "react";
import "./Search.css";
import { apiAxios } from "../axios/apiAxios";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

interface Profile {
  id: number;
  login: string;
}

const Search: FC = ({}) => {
  const [input, setInput] = useState<string>("");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [inputActive, setInputActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input) {
      const searchUsers = async (input: string) => {
        const { data } = await apiAxios.post("/search", { input });
        if (data.length != 0) {
          setProfiles(data);
        } else {
          setProfiles([]);
        }
      };
      searchUsers(input);
    } else {
      setProfiles([]);
    }
  }, [input, setInput]);

  const selectProfile = () => {
    setInputActive(false);
    setInput("");
  };

  return (
    <div className="search">
      <div className="search-align">
        <div className="search-input">
          <input
            ref={inputRef}
            onBlur={() => setInputActive(false)}
            onClick={() => setInputActive(true)}
            type="text"
            value={input}
            placeholder="🔍Поиск"
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <CSSTransition
            in={inputActive}
            timeout={300}
            classNames="modal-widget"
            unmountOnExit
          >
            <div
              onClick={() => inputRef.current?.focus()}
              className={
                input && profiles.length > 0 ? "search-bar" : "search-bar-none"
              }
            >
              {profiles.map((elem) => (
                <Link to={`/profile/${elem.id}`}>
                  <div
                    onClick={() => selectProfile()}
                    className="search-profile-wrapper"
                  >
                    <img
                      className="search-profile-avatar"
                      src={`http://parallax-project.ru:5000/static/uploads/${
                        elem.id
                      }.png?${Date.now()}`}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src =
                          "http://parallax-project.ru:5000/static/uploads/empty-photo.png";
                      }}
                    ></img>
                    {elem.login}
                  </div>
                </Link>
              ))}
            </div>
          </CSSTransition>
        </div>
      </div>
    </div>
  );
};
export default Search;
