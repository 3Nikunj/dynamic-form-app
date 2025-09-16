import React from 'react';

// FormField component demonstrating Props usage
const FormField = (props) => {
  const {
    label,
    type,
    name,
    value,
    onChange,
    error,
    required = false,
    placeholder = '',
    min,
    max,
    className = ''
  } = props;

  // Render different input types based on props
  const renderInput = () => {
    const baseProps = {
      id: name,
      name: name,
      value: value,
      onChange: onChange,
      className: `form-control ${error ? 'error' : ''} ${className}`,
      placeholder: placeholder
    };

    switch (type) {
      case 'textarea':
        return (
          <textarea
            {...baseProps}
            rows="4"
          />
        );
      
      case 'number':
        return (
          <input
            {...baseProps}
            type="number"
            min={min}
            max={max}
          />
        );
      
      case 'email':
        return (
          <input
            {...baseProps}
            type="email"
          />
        );
      
      default:
        return (
          <input
            {...baseProps}
            type={type || 'text'}
          />
        );
    }
  };

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="required-asterisk">*</span>}
      </label>
      
      {renderInput()}
      
      {/* Conditional rendering for error messages */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormField;