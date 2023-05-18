const NoDataFound = props => {
  const { text = 'No Data Found', height = 250, width = 'w-100', className = '' } = props;
  return (
    <div className={`profilefeed single-post h-100 ${width} ${className}`} id="profilesche">
      <div
        className="card card-2 d-flex justify-content-center align-items-center"
        style={{ cursor: 'auto', backgroundColor: 'transparent', minHeight: height }}
      >
        {text}
      </div>
    </div>
  );
};

export default NoDataFound;
