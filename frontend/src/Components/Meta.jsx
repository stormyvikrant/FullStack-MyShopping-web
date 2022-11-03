import React from 'react'
import {Helmet} from "react-helmet";

const Meta = ({title, description, keywords}) => {
  return (
    <Helmet>
 <title> {title} </title> 
<meta name="description" content={description}/>
<meta name="keywords" content={keywords}/>
    </Helmet>
  )
}

Meta.defaultProps = {
    title: "Welcome To Myshopping",
    description: "We sell best products with fast delivery",
    keywords: "electronics, buy electronics, quality electronics"
}

export default Meta