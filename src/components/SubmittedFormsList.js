import React from 'react';

// SubmittedFormsList component demonstrating Props and Lists rendering
const SubmittedFormsList = ({ forms, onDelete }) => {
  return (
    <div className="submitted-forms-container">
      <h2>Submitted Forms ({forms.length})</h2>
      
      {/* List rendering - mapping through submitted forms */}
      <div className="forms-list">
        {forms.map((form) => (
          <div key={form.id} className="form-card">
            <div className="form-card-header">
              <h3>Form #{form.id}</h3>
              <div className="form-actions">
                <span className="submitted-date">{form.submittedAt}</span>
                <button 
                  onClick={() => onDelete(form.id)}
                  className="delete-btn"
                  title="Delete this form"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="form-card-content">
              <div className="form-field-display">
                <strong>Name:</strong> {form.name}
              </div>
              
              <div className="form-field-display">
                <strong>Email:</strong> {form.email}
              </div>
              
              {/* Conditional rendering - show age only if provided */}
              {form.age && (
                <div className="form-field-display">
                  <strong>Age:</strong> {form.age}
                </div>
              )}
              
              {/* Conditional rendering - show country only if selected */}
              {form.country && (
                <div className="form-field-display">
                  <strong>Country:</strong> {form.country}
                </div>
              )}
              
              {/* Conditional rendering and list rendering - show interests if any */}
              {form.interests && form.interests.length > 0 && (
                <div className="form-field-display">
                  <strong>Interests:</strong>
                  <ul className="interests-list">
                    {form.interests.map((interest, index) => (
                      <li key={index} className="interest-item">
                        {interest}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Conditional rendering - show message only if provided */}
              {form.message && (
                <div className="form-field-display">
                  <strong>Message:</strong>
                  <p className="message-text">{form.message}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Conditional rendering - show message when no forms */}
      {forms.length === 0 && (
        <div className="no-forms-message">
          <p>No forms submitted yet. Fill out the form above to see your submissions here!</p>
        </div>
      )}
    </div>
  );
};

export default SubmittedFormsList;