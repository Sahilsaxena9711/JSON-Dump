import "./index.css";

const Header = (props) => {
  const { onSingIn, onLogout, authData } = props;
  return (
    <header>
      <span className="logo">
        <span className="redText">JS</span>ON DUMP
      </span>
      <button
        onClick={authData?.uid ? onLogout : onSingIn}
        className="button alsc"
      >
        {authData?.uid ? null : (
          <img className="google" src={require("../../assets/google.png")} />
        )}
        <span>{!authData?.uid ? "Login" : "Logout"}</span>
      </button>
    </header>
  );
};

export default Header;
