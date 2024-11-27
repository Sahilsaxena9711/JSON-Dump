// import "./index.css";

const Header = (props) => {
  const { onSingIn, onLogout, authData } = props;
  return (
    <header className="z-10 fixed bg-lessWhite flex-row flex w-full justify-between border-b items-center pl-4 pr-4 pt-2 pb-2 md:pl-20 md:pr-20 md:pt-4 md:pb-4 ">
      <span className="md:text-3xl text-2xl ">
        <span className="text-red">JS</span>ON DUMP
      </span>
      <button
        onClick={authData?.uid ? onLogout : onSingIn}
        className="group hover:bg-red bg-white border border-borderRed md:pb-2 md:pt-2 md:pl-3 md:pr-3 pb-1 pt-1 pl-2 pr-2 rounded-full flex flex-row item-center"
      >
        {authData?.uid ? null : (
          <img className="w-8 mr-2" src={require("../../assets/google.png")} />
        )}
        <span className="text-red group-hover:text-white md:text-1xl text-lg">
          {!authData?.uid ? "Login" : "Logout"}
        </span>
      </button>
    </header>
  );
};

export default Header;
