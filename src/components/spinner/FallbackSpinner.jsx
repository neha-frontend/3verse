import Spinner from '.';

const FallbackSpinner = () => {
  return (
    <div className="min-vh-100 bg-dark d-flex justify-content-center align-items-center">
      <Spinner />
    </div>
  );
};

export default FallbackSpinner;
