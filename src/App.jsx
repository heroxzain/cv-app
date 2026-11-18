import { useState } from 'react';
import './styles/App.css';
import './styles/Welcome.css';
import Section from './components/Section';
import DisplayCV from './components/DisplayCV';

const sections = [
  {
    id: 'general', 
    name: 'General Information', 
    values: [
      { id: 'name', value: "Name: "}, 
      { id: 'email', value:"Email: "}, 
      { id: 'phone', value:" Phone: "}
    ]
  }, 
  {
    id: 'education', 
    name: 'Educational Experience', 
    values: [
      { id: 'school-name', value: "School Name: "}, 
      { id: 'title-of-study', value: "Title of Study: "}, 
      { id: 'date-of-study', value: "Date of Study: "}
    ]
  }, 
  {
    id: 'experience', 
    name: 'Practical Experience', 
    values: [
      {id: 'company-name', value: "Company Name: "}, 
      {id: 'position', value: "Position: "}, 
      {id: 'title', value: "Title: "}, 
      {id: 'main-responsibilities', value: "Main Responsibilities: "}, 
      {id: 'date-from', value: "Date from: "}, 
      {id: 'date-until', value: "Date until: "}
    ]
  }, 
];

const defaultCV = sections.reduce((acc, section) => {
  acc[section.id] = section.values.reduce((acc, value) => {
    acc[value.id] = '';
    return acc;
  }, {});
  return acc;
}, {});

export default function App() {
  const [currentStep, setcurrentStep] = useState(0);
  const [cvdata, setcvdata] = useState(defaultCV);

  function reset() { 
    setcurrentStep(0); 
    setcvdata(defaultCV);
  };
  function moveForward() { setcurrentStep(currentStep + 1); }
  function moveBackward() { setcurrentStep(currentStep - 1); }
  function handleEdit(id, fieldId, newValue) {
    setcvdata(prevData => ({
        ...prevData, 
        [id]: {...prevData[id], [fieldId]: newValue},
    }));
  }

  if (currentStep == 0) {
    return (
      <main>
        <h2>Welcome to the CV Maker</h2>
        <p>Here you can create amazing CVs simply by entering your personal and educational information.</p>
        <button onClick={moveForward} className='InitialButton'>Get Started!</button>
      </main>
    );  
  } else if (currentStep >= 1 && currentStep <= sections.length) {
    const activeSection = sections[currentStep - 1];
    return (
      <Section 
        fields={activeSection} 
        moveBackward={moveBackward} 
        moveForward={moveForward} 
        handleEdit={handleEdit}
        sectionData={cvdata[activeSection.id]}
        isLastStep={currentStep === sections.length}
      />
    );
  } else {
    return (
      <div className='cv-page'>
        <h1>{cvdata.general.name}'s CV</h1>
        <DisplayCV cv={cvdata} sections={sections}/>
        <div className='cv-actions'>
          <button type='button' className='btn btn-secondary' onClick={moveBackward}>Edit CV</button>
          <button type='button' className='btn btn-danger' onClick={reset}>Create New CV</button>
        </div>
      </div>
    );
  }
}
