import './spinner.css';

const Spinner = ({ className = '' }) => (
  <div className={`d-flex justify-content-center ${className}`}>
    <div className="spinner-border" role="status">
      <span className="sr-only"></span>
    </div>
  </div>
);

export default Spinner;
