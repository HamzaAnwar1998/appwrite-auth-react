import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../lib/appwrite";

const Home = () => {
  // navigate
  const navigate = useNavigate();

  // general states
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // get current logged in user
  useEffect(() => {
    account
      .get()
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // logout states
  const [logoutLoader, setLogoutLoader] = useState(false);
  const [logoutErr, setLogoutErr] = useState(null);

  // logout event
  const handleLogout = () => {
    setLogoutLoader(true);
    setLogoutErr(null);
    account
      .deleteSession('current')
      .then((res) => {
        console.log(res);
        setUser(null);
      })
      .catch((err) => {
        setLogoutErr(err.message);
      })
      .finally(() => setLogoutLoader(false));
  };

  return (
    <div className="background">
      {loading ? (
        <h5>Please Wait...</h5>
      ) : (
        <>
          {user ? (
            <>
              <div className="user-circle">
                {user.name
                  .split(" ")
                  .map((word, index) =>
                    index === 0 || index === user.name.split(" ").length - 1
                      ? word.charAt(0)
                      : ""
                  )
                  .join("")}
              </div>
              <h5>{user.email}</h5>
              {logoutErr && <div className="error-msg">{logoutErr}</div>}
              <button
                type="button"
                className="logout-btn"
                onClick={handleLogout}
              >
                {logoutLoader ? "..." : "Logout"}
              </button>
            </>
          ) : (
            <>
              <h1>Welcome to the AppWrite Auth tutorial with React!</h1>
              <h5>
                Learn Complete User Authentication With React and AppWrite
              </h5>
              <div className="navigation-btns">
                <button type="button" onClick={() => navigate("/signup")}>
                  Register
                </button>
                <button type="button" onClick={() => navigate("/login")}>
                  Login
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
