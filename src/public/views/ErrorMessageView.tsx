import React from 'react';

import "../styles/ErrorMessageStyle.css";

export type ErrorMessageProps = {
  errorMessage: string
}

const ErrorMessageView = (props: ErrorMessageProps) => {
 return (
    <div className="errorMessage"><p><span>{props.errorMessage}</span></p></div>
 )
};

export default ErrorMessageView;