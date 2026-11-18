import '../styles/DisplayCV.css';

export default function DisplayCV({cv, sections}) {
  const section = sections.map(sec => {
    return (
      <div key={sec.id} className='cv-section'>
        <h2>{sec.name}</h2>
        <ul className='cv-list'> 
            {sec.values.map(value => (
              <li key={value.id} className='cv-item'>
                <span className='cv-label'>{value.value}</span>
                <span className='cv-value'>{cv[sec.id][value.id]}</span>
              </li>
            ))}
        </ul>
      </div>
    );
  });
  return <div className='cv'>{section}</div>;
}
