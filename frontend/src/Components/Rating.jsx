import React from 'react'

// import PropTypes from 'prop-types'  //Not necessary thing to do


const Rating = ({value, text, color="#f8e825"}) => {
  
  const stars= [];

  for(var i =0; i<5; i++){
      if(value -i >=1){
          stars.push(<i className="fas fa-star"></i>)
      }
      else if(value -i > 0 && value -i <1){
        stars.push(<i className="fas fa-star-half-alt"></i>);
      }
      else{
        stars.push(<i className="far fa-star"></i>);
      }
  }
    return (
    <div className="rating" >
        {stars.map((star)=>(
            <span key={Math.floor((Math.random() * 10000) + 1)} style={{color: color}}> {star} </span>
        ))}
          <span>{text && text}</span>
    </div>
  )
}

// Rating.propTypes = {
//     value : PropTypes.number.isRequired,
//     text : PropTypes.string.isRequired,
//     color : PropTypes.string,


// }
// not neccessary. Just to ensure more safety. Check console if type of props are different. Though it will work fine in screen 

export default Rating






// export const Rating = ({ value, text }) => {
//     const stars = [];
//     for (var i = 0; i < 5; i++) {
//       if (value - i >= 1) {
//         stars.push(<i className="fas fa-star"></i>);
//       } else if (value - i > 0 && value - i < 1) {
//         stars.push(<i className="fas fa-star-half-alt"></i>);
//       } else {
//         stars.push(<i className="far fa-star"></i>);
//       }
//     }
//     return (
//       <div className="rating">
//         {stars.map((star) => (
//           <span>{star}</span>
//         ))}
//         <span>{text && text}</span>
//       </div>
//     );
//   };