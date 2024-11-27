import "./index.css";

const Loading = () => {
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <span className="text-2xl font-semiboldme">
        <span className="text-red">{"{ "}</span> Loading...
        <span className="text-red">{" }"}</span>
      </span>
    </div>
  );
};

export default Loading;
