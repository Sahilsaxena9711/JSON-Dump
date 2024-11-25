import "./index.css";

const Footer = () => {
  return (
    <footer>
      <div className="column">
        <span className="logo">
          <span className="redText">JS</span>ON DUMP
        </span>
        <div className=""></div>
        <div className="row mt40">
          <span className="author">
            Crafted By:{" "}
            <a href="https://devsahil.in" target="_blank">
              devsahil.in
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
