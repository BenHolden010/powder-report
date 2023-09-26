import './DayCard.css';
import HourCard from './HourCard';
import PropTypes from 'prop-types';

const DayCard = ({date, chanceofsnow, maxTempF, minTempF, hours}) => {
// console.log('date', date)
// console.log('chanceOfSnow', chanceofsnow)
// console.log('maxTempF',maxTempF)
// console.log('minTempF',minTempF)
// console.log('hours',hours)
  const weatherPerHour = hours.map(hour=>{
   return <HourCard 
   hour={hour} 
   key={hour.time}/>
  })
    return (
      <div className='day-card' >
        <h3>{date}</h3>
        <p>Chance of Snowfall: {chanceofsnow}%</p>
        <p>High: {maxTempF}ºF Low: {minTempF}ºF</p>
        <div className='hour-container'>
          {weatherPerHour}
        </div>
      </div>
    )
  }
  export default DayCard;

  DayCard.propTypes = {
    date: PropTypes.string.isRequired,
    chanceofsnow: PropTypes.string.isRequired, 
    maxTempF: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired, 
    minTempF: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,  
    hours: PropTypes.arrayOf({
      bottom: PropTypes.arrayOf({
        weatherIconUrl: PropTypes.arrayOf({
          value: PropTypes.string.isRequired
        })
      }),
      snowfall_cm: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired
    }).isRequired
  }