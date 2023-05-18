import './form.css';

const StepFormIndicator = ({ width = '0%' }) => (
  <div className="form-step">
    <span style={{ width }}></span>
  </div>
);

export default StepFormIndicator;
