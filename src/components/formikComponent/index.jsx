import { useState, useRef } from 'react';
import { getIn, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';

import { RenderIf } from '../../utils';

import './formikComponent.css';
import 'react-datepicker/dist/react-datepicker.css';

export const CustomInput = ({
  field,
  form: { touched, errors },
  mainClassName = 'mb-4 form-group d-flex align-items-center',
  inputClassName = 'modal-form-control',
  type = 'text',
  name = '',
  placeholder = 'Enter text',
  label = '',
  style = {},
  withOutLabel = false,
  // showError = true,
  showError = true,
  showEyeIcon = false,
  onChange = null,
  disabled= false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);

  const passowordRef = useRef();
  const { setFieldValue } = useFormikContext();

  // useEffect(() => {
  //   if (passowordRef.current && type === 'password')
  //     passowordRef.current.onpaste = (e) => e.preventDefault();
  // }, [passowordRef.current]);
  return (
    <>
      <div className={`${mainClassName} ${showEyeIcon ? 'position-relative' : ''}`} style={style}>
        {!withOutLabel && (
          <label className="modal-form-label" htmlFor={name}>
            {label}
          </label>
        )}
        <input
          className={`form-control ${inputClassName} ${
            showError && error && touch ? 'is-invalid' : ''
          }`}
          type={showPassword ? 'text' : type}
          name={name}
          placeholder={placeholder}
          {...field}
          ref={passowordRef}
          onChange={(e) => {
            if (onChange) onChange(e);
            setFieldValue(field.name, e.target.value);           
          }}
          disabled={disabled}
        />

        <RenderIf isTrue={showEyeIcon}>
          <i
            className={`cp fa-solid text-light ${
              showPassword ? 'fa-eye' : 'fa-eye-slash'
            } position-absolute password-eye-icon`}
            onClick={() => setShowPassword(!showPassword)}
          />
        </RenderIf>
      </div>
      {showError && error && touch && <div className="invalid-feedback">{error}</div>}
    </>
  );
};

export const CustomTextArea = ({
  field,
  form: { touched, errors },
  withOutLabel,
  mainClassName = 'form-group textarea-form-group',
  textAreaClassName = 'form-control modal-form-control',
  placeholder = 'textArea',
  requiredField = false,
  showError = false,
  disabled={disabled},
  ...props
}) => {
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);

  return (
    <div className={mainClassName}>
      {!withOutLabel && (
        <label className="modal-form-label">
          {props.label} {requiredField && <span className="mendatory_sign">*</span>}
        </label>
      )}
      <textarea
        className={`form-control ${textAreaClassName} ${
          showError && error && touch ? 'is-invalid' : ''
        }`}
        placeholder={placeholder}
        {...field}
        {...props}
        disabled={disabled}></textarea>
      {error && touch && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export const CustomDateInputLog = ({
  field,
  form: { touched, errors },
  withOutLabel,
  dateFormat = 'dd/MM/yyyy',
  maxDate = new Date(),
  label = '',
  placeholder = 'Choose Date',
  mainClassName = 'form-group signUpDate-form-group',
  inputClassName = 'form-control modal-form-control',
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);
  const showMonth = props.showMonth;
  const showYear = props.showYear;
  return (
    <div className={mainClassName}>
      {!withOutLabel && (
        <label htmlFor className="small text-secondary fw-600">
          {label}
        </label>
      )}
      <div className={`input-group mb-0 ${error && touch ? 'is-invalid' : ''}`}>
        <DatePicker
          dateFormat={dateFormat}
          autoComplete="off"
          className={inputClassName}
          {...field}
          {...props}
          placeholderText={placeholder}
          selected={(field.value && new Date(field.value)) || null}
          onChange={(val) => setFieldValue(field.name, val)}
          showMonthDropdown={showMonth}
          showYearDropdown={showYear}
          dropdownMode="select"
          maxDate={maxDate}
        />
        {error && touch && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export const CustomCheckbox = ({
  field,
  form: { touched, errors },
  mainClassName = 'form-check d-flex align-items-center mb-3',
  inputClassname = 'form-check-input',
  labelClassName = 'auth-checkbox-label',
  label = '',
  id = '',
  name = '',
  onChange = null,
  ...props
}) => {
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);

  const { setFieldValue } = useFormikContext();
  return (
    <>
      <div className={mainClassName}>
        <input
          name={name}
          id={id}
          type="checkbox"
          className={inputClassname}
          {...field}
          onChange={() => {
            if (onChange) onChange();
            setFieldValue(field.name, !props.val);
          }}
        />
        <label className={labelClassName} htmlFor={id}>
          {label}
        </label>
      </div>
      {error && touch && <div className="invalid-feedback">{error}</div>}
    </>
  );
};

export const CustomDropdown = ({ field, form: { touched, errors }, ...props }) => {
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);

  return (
    <>
      <div className={`${props.styleData} space-y-10`} style={props.style}>
        {!props.withOutLabel && (
          <span className="nameInput">
            {props.label}
            {props.requiredField && <span className="mendatory_sign">*</span>}
          </span>
        )}

        <select
          className={`form-select ${props.selectclass} w-100 custom-select ${
            error && touch && 'is-invalid'
          }`}
          {...field}
          {...props}
          onChange={(e) => {
            field.onChange(e);
            if (props.handleChange) {
              props.handleChange(e);
            }
          }}
          disabled={props.disabled}>
          <option value="" className="d-none">
            {props.placeholder}
          </option>
          {props.data &&
            props.data.map((i, idx) => (
              <option key={idx} value={i.value}>
                {i.label}
              </option>
            ))}
        </select>
        {error && touch && <div className="invalid-feedback">{error}</div>}
      </div>
    </>
  );
};
