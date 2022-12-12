import React from "react";

function Alert(props) {
  // const capitalize = (word) => {
  //   let w = word.toLowerCase();
  //   return w.charAt(0).toUpperCase() + w.slice(1);
  // };

  return (
    props.alert && (
      <div className={`alert alert-${props.alert.type===true?'success':'danger'} alert-dismissible fade show`} 
        role="alert" style={{position:'absolute', top:'56px', width:'100vw', height:'50px'}}>
        <strong>{(props.alert.type===true?'Success':'Error')}---- </strong>
        {props.alert.msg}
      </div>
    )
  );
}

export default Alert;
