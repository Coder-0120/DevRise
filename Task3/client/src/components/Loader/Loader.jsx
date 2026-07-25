import "./Loader.css";

function Loader({ label = "Loading" }) {
  return (
    <div className="loader">
      <span className="loader-spinner" />
      <p>{label}…</p>
    </div>
  );
}

export default Loader;
