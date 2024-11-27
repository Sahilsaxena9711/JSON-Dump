const Home = (props) => {
  const { onSingIn } = props;
  return (
    <>
      <div className="flex flex-col">
        <div className="h-screen flex pl-4 pr-4 items-center justify-center flex-col">
          <span className="md:text-5xl font-medium text-3xl text-center">
            {"{  "}
            <span className="text-red">Instant</span> Mock Data,{" "}
            <span className="text-red">Effortless</span> Development..{"  }"}
          </span>
          <span className="md:text-2xl md:mt-10 mt-4 text-md font-light text-center">
            Generate realistic mock data and build APIs in seconds to streamline
            <br />
            your development process.
          </span>
        </div>
        <div className="flex flex-col pl-4 pr-4 pt-2 pb-2 md:pl-20 md:pr-20 md:pt-4 md:pb-4 md:mb-20 mb-10">
          <span className=" text-red font-bold md:text-2xl text-xl">
            HOW IT WORKS?
          </span>
          <div className="md:grid md:grid-cols-8 md:grid-flow-row md:gap-2 flex flex-col md:mt-20 mt-10">
            <div className="md:col-span-2 flex flex-col w-100 md:w-auto">
              <span className="md:text-2xl text-center font-semibold text-lg">
                Define Your Data
              </span>
              <span className="font-normal md:text-xl text-center text-sm">
                Use the intuitive interface to define the structure of your mock
                data.
              </span>
            </div>
            <span className="z-0 rotate-90 md:rotate-0 text-center rightIcon">
              &#10141;
            </span>
            <div className="md:col-span-2 flex flex-col w-100 md:w-auto">
              <span className="md:text-2xl text-center font-semibold text-lg">
                Generate API Endpoints
              </span>
              <span className="font-normal md:text-xl text-center text-sm">
                Create dummy GET API endpoints from the json.
              </span>
            </div>
            <span className="z-0 rotate-90 md:rotate-0 text-center rightIcon">
              &#10141;
            </span>
            <div className="md:col-span-2 flex flex-col w-100 md:w-auto">
              <span className="md:text-2xl text-center font-semibold text-lg">
                Use Anywhere
              </span>
              <span className="font-normal md:text-xl text-center text-sm">
                Fetch data from your mock API just like backend.{"\n"}Perfect
                for front-end and UI design.
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col pl-4 pr-4 pt-2 pb-2 md:pl-20 md:pr-20 md:pt-4 md:pb-4 md:mb-20 mb-10">
          <span className=" font-bold md:text-2xl text-xl text-red">
            WHY USE JSON DUMP?
          </span>
          <div className="">
            <ul className="mt-10 list-disc list-inside">
              <li>
                <span className="font-normal md:text-2xl text-center text-md">
                  Quickly generate customizable JSON data structures for testing
                  and development purposes.
                </span>
              </li>
              <li>
                <span className="font-normal md:text-2xl text-center text-md">
                  Easily tweak the structure of your data or API responses to
                  match any project needs.
                </span>
              </li>
              <li>
                <span className="font-normal md:text-2xl text-center text-md">
                  Focus on the front-end while we handle the mock backend for
                  you.
                </span>
              </li>
              <li>
                <span className="font-normal md:text-2xl text-center text-md">
                  Build mock data without writing a single line of code – it's
                  simple, intuitive, and fast.
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col pl-4 pr-4 pt-2 pb-2 md:pl-20 md:pr-20 md:pt-4 md:pb-4 md:mb-20 mb-20">
          <span className="font-bold md:text-2xl text-xl text-red">
            SIGNUP TO GET STARTED
          </span>
          <button
            onClick={onSingIn}
            className="mt-20 group hover:bg-red bg-white border border-borderRed md:pb-2 md:pt-2 md:pl-3 md:pr-3 pb-1 pt-1 pl-2 pr-2 rounded-full self-center flex flex-row item-center"
          >
            <img className="w-8" src={require("../../assets/google.png")} />
            <span className="text-red group-hover:text-white md:text-1xl ml-2 text-xl">
              Login
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
