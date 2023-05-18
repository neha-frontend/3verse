import { v4 as uuidv4 } from 'uuid';

import { StepFormIndicator } from '../../components';
import { RenderIf } from '../../utils';
import SubHeaderLayout from '../subHeaderLayout';

import './index.css';

const FusionLayout = ({ bodyClassName = '', heading = '', formStepArray = [], children }) => (
  <SubHeaderLayout headerText="Home page  .   Fusion" headerClassName="mb-3">
    <div className="fusion-container">
      <RenderIf isTrue={heading}>
        <h2 className="fusion-container-heading">{heading}</h2>
      </RenderIf>
      <div className="form-steps-containter">
        {formStepArray.map((step) => (
          <StepFormIndicator width={step} key={uuidv4()} />
        ))}
      </div>

      <div className={bodyClassName}>{children}</div>
    </div>
  </SubHeaderLayout>
);

export default FusionLayout;
