import "./index.css";

const Home = (props) => {
  const { onSingIn } = props;
  return (
    <>
      <div className="home column">
        <span className="heading tac">
          {"{  "}
          <span className="redText">Instant</span> Mock Data,{" "}
          <span className="redText">Effortless</span> Development..{"  }"}
        </span>
        <span className="text tac">
          Generate realistic mock data and build APIs in seconds to streamline
          <br />
          your development process.
        </span>
        <div className="column sectionTop">
          <span className="subHeading bold redText">HOW IT WORKS?</span>
          <div className="row jcsb">
            <div className="column w-28">
              <span className="subHeading tac">Define Your Data</span>
              <span className="text tac">
                Use the intuitive interface to define the structure of your mock
                data.
              </span>
            </div>
            <span className="rightIcon">&#10141;</span>
            <div className="column w-28">
              <span className="subHeading tac">Generate API Endpoints</span>
              <span className="text tac">
                Create dummy GET API endpoints from the json.
              </span>
            </div>
            <span className="rightIcon">&#10141;</span>
            <div className="column w-28">
              <span className="subHeading tac">Use Anywhere</span>
              <span className="text tac">
                Fetch data from your mock API just like backend. Perfect for
                front-end and UI design.
              </span>
            </div>
          </div>
        </div>
        <div className="column sectionTop">
          <span className="subHeading bold redText">WHY USE JSON DUMP?</span>
          <div className="row jcfe">
            <ul>
              <li>
                <span className="text">
                  Quickly generate customizable JSON data structures for testing
                  and development purposes.
                </span>
              </li>
              <li>
                <span className="text">
                  Easily tweak the structure of your data or API responses to
                  match any project needs.
                </span>
              </li>
              <li>
                <span className="text">
                  Focus on the front-end while we handle the mock backend for
                  you.
                </span>
              </li>
              <li>
                <span className="text">
                  Build mock data without writing a single line of code – it's
                  simple, intuitive, and fast.
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="column sectionTop">
          <span className="subHeading bold redText">SIGNUP TO GET STARTED</span>
          <button onClick={onSingIn} className="button alsc mt40">
            <img className="google" src={require("../../assets/google.png")} />
            <span>Login</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
