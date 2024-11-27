// import "./index.css";

const Footer = () => {
  return (
    <footer className="border-t flex flex-col pl-4 pr-4 pt-4 pb-4 md:pl-20 md:pr-20 md:pt-4 md:pb-4">
      <div className="flex flex-col">
        <span className="md:text-3xl text-2xl">
          <span className="text-red">JS</span>ON DUMP
        </span>
        <span className="text-center mt-10">
          Crafted By:{" "}
          <a
            className="text-red underline cursor-pointer"
            href="https://devsahil.in"
            target="_blank"
          >
            devsahil.in
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
