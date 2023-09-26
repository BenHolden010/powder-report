import './Reports.css';
import ReportCard from "./ReportCard"
import PropTypes from 'prop-types';

function Reports({ reports, deleteReport }){
console.log('reports', reports)
  const reportCards = reports.map(report => {
    return (
      <ReportCard
        id={report.id}
        location={report.location}
        currentSnowfall={report.currentSnowfall}
        maxSnow={report.maxSnow}
        deleteReport={deleteReport}
        key={report.id}
      />
    )
  })

  return (
    <>
    {!reportCards.length && <h2 className='card'>No reports! Please go Home to add a new Report!</h2>}
    <div className='reports-container'> 
      {reportCards}
    </div>
    </>
  )
}
export default Reports;

Reports.propTypes = {
  reports: PropTypes.arrayOf({
  currentSnowfall: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  maxSnow: PropTypes.number.isRequired,
  key: PropTypes.number.isRequired
  }).isRequired,
  deleteReport: PropTypes.func.isRequired
}