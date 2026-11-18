import '../styles/Section.css';

export default function Section({
    fields, 
    moveForward, 
    moveBackward, 
    handleEdit, 
    sectionData, 
    isLastStep
}) {
  function handleSubmit(e) {
    e.preventDefault();
    moveForward();
  }
  const values = fields.values.map(value => {
    return (
      <li key={value.id} className='form-field'>
        <label>
          <span>{value.value}</span>
          <input
            required 
            type={value.type || 'text'}
            value={sectionData[value.id]}
            onChange={(e) => handleEdit(fields.id, value.id, e.target.value)}
          />
        </label>
      </li>
    );
  });
  return (
    <form className='section-card' onSubmit={handleSubmit}>
      <h2>{fields.name}</h2>
      <ul className='field-list'>{values}</ul>
      <div className='buttons'>
        <button 
            type='button' 
            className='btn btn-secondary'
            onClick={moveBackward}>Previous</button>
        <button
            type='submit'
            className='btn btn-primary'>
            {isLastStep ? 'Submit CV' : 'Next'}
        </button>
      </div>
    </form>
  );
}
