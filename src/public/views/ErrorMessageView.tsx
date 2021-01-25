import React, {useEffect, useRef} from 'react';

import "../styles/ErrorMessageStyle.css";

export type ErrorMessageProps = {
  errorMessage: string
}

const ErrorMessageView = (props: ErrorMessageProps) => {
  const errorMessageDiv = useRef(null);
  useEffect(() => {    
    errorMessageDiv.current.className = "errorMessage"
    setTimeout(function(){
      errorMessageDiv.current.className = "errorMessage hidden"
    }, 6000);
  });


 return (
    <div ref={errorMessageDiv} className="errorMessage"><p><span>{props.errorMessage}</span></p></div>
 )
};

export default ErrorMessageView;