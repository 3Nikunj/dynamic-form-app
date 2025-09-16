import React, { Component } from 'react';
import './App.css';
import FormField from './components/FormField';
import SubmittedFormsList from './components/SubmittedFormsList';

class App extends Component {
  constructor(props) {
    super(props);
    
    // State management - demonstrating React state
    this.state = {
      // Form data (controlled components)
      formData: {
        name: '',
        email: '',
        age: '',
        country: '',
        interests: [],
        message: ''
      },
      // Form validation errors
      errors: {},
      // List of submitted forms
      submittedForms: [],
      // Dynamic field visibility
      showAdvancedFields: false,
      // Available countries for dropdown
      countries: ['USA', 'Canada', 'UK', 'Australia', 'India', 'Germany'],
      // Available interests for checkboxes
      availableInterests: ['Technology', 'Sports', 'Music', 'Travel', 'Reading', 'Gaming']
    };
  }

  // Lifecycle method - componentDidMount
  componentDidMount() {
    console.log('Component mounted - Form is ready!');
    // Load saved forms from localStorage (simulating data persistence)
    const savedForms = localStorage.getItem('submittedForms');
    if (savedForms) {
      this.setState({ submittedForms: JSON.parse(savedForms) });
    }
  }

  // Lifecycle method - componentDidUpdate
  componentDidUpdate(prevProps, prevState) {
    // Save to localStorage whenever submittedForms changes
    if (prevState.submittedForms !== this.state.submittedForms) {
      localStorage.setItem('submittedForms', JSON.stringify(this.state.submittedForms));
      console.log('Forms saved to localStorage');
    }
  }

  // Event handling - Input change handler
  handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    
    if (type === 'checkbox') {
      // Handle checkbox arrays (interests)
      if (name === 'interests') {
        const updatedInterests = checked
          ? [...this.state.formData.interests, value]
          : this.state.formData.interests.filter(interest => interest !== value);
        
        this.setState({
          formData: {
            ...this.state.formData,
            interests: updatedInterests
          }
        });
      }
    } else {
      // Handle regular inputs
      this.setState({
        formData: {
          ...this.state.formData,
          [name]: value
        },
        // Clear error when user starts typing
        errors: {
          ...this.state.errors,
          [name]: ''
        }
      });
    }
  };

  // Form validation
  validateForm = () => {
    const { formData } = this.state;
    const errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    // Age validation (if advanced fields are shown)
    if (this.state.showAdvancedFields) {
      if (!formData.age) {
        errors.age = 'Age is required';
      } else if (formData.age < 1 || formData.age > 120) {
        errors.age = 'Please enter a valid age (1-120)';
      }
    }

    return errors;
  };

  // Event handling - Form submission
  handleSubmit = (event) => {
    event.preventDefault();
    
    const errors = this.validateForm();
    
    if (Object.keys(errors).length === 0) {
      // Add timestamp and ID to the form data
      const submittedForm = {
        ...this.state.formData,
        id: Date.now(),
        submittedAt: new Date().toLocaleString()
      };
      
      // Add to submitted forms list
      this.setState({
        submittedForms: [...this.state.submittedForms, submittedForm],
        // Reset form
        formData: {
          name: '',
          email: '',
          age: '',
          country: '',
          interests: [],
          message: ''
        },
        errors: {}
      });
      
      alert('Form submitted successfully!');
    } else {
      this.setState({ errors });
    }
  };

  // Event handling - Toggle advanced fields
  toggleAdvancedFields = () => {
    this.setState({
      showAdvancedFields: !this.state.showAdvancedFields
    });
  };

  // Event handling - Delete submitted form
  deleteSubmittedForm = (id) => {
    this.setState({
      submittedForms: this.state.submittedForms.filter(form => form.id !== id)
    });
  };

  render() {
    const { formData, errors, submittedForms, showAdvancedFields, countries, availableInterests } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Dynamic Form with Controlled Components</h1>
          <p>Demonstrating React Concepts: Props, State, Lifecycle, Events, Conditional Rendering & Lists</p>
        </header>

        <main className="main-content">
          <div className="form-container">
            <h2>User Registration Form</h2>
            
            <form onSubmit={this.handleSubmit} className="dynamic-form">
              {/* Basic Fields - Always visible */}
              <FormField
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={this.handleInputChange}
                error={errors.name}
                required={true}
              />

              <FormField
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={this.handleInputChange}
                error={errors.email}
                required={true}
              />

              {/* Toggle button for advanced fields */}
              <button
                type="button"
                onClick={this.toggleAdvancedFields}
                className="toggle-btn"
              >
                {showAdvancedFields ? 'Hide' : 'Show'} Advanced Fields
              </button>

              {/* Conditional rendering - Advanced fields */}
              {showAdvancedFields && (
                <div className="advanced-fields">
                  <FormField
                    label="Age"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={this.handleInputChange}
                    error={errors.age}
                    min="1"
                    max="120"
                  />

                  {/* Dropdown - demonstrating lists */}
                  <div className="form-group">
                    <label htmlFor="country">Country:</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={this.handleInputChange}
                      className="form-control"
                    >
                      <option value="">Select a country</option>
                      {countries.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Checkboxes - demonstrating lists and arrays */}
                  <div className="form-group">
                    <label>Interests:</label>
                    <div className="checkbox-group">
                      {availableInterests.map((interest, index) => (
                        <label key={index} className="checkbox-label">
                          <input
                            type="checkbox"
                            name="interests"
                            value={interest}
                            checked={formData.interests.includes(interest)}
                            onChange={this.handleInputChange}
                          />
                          {interest}
                        </label>
                      ))}
                    </div>
                  </div>

                  <FormField
                    label="Message"
                    type="textarea"
                    name="message"
                    value={formData.message}
                    onChange={this.handleInputChange}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              )}

              <button type="submit" className="submit-btn">
                Submit Form
              </button>
            </form>
          </div>

          {/* Conditional rendering - Show submitted forms if any exist */}
          {submittedForms.length > 0 && (
            <SubmittedFormsList
              forms={submittedForms}
              onDelete={this.deleteSubmittedForm}
            />
          )}
        </main>
      </div>
    );
  }
}

export default App;
