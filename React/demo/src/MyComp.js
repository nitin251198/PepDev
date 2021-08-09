// let MyComp = () =>{
//     return (
//         <div >
//           <h1> My First React Componenet</h1>
//           <p>
//               lorem lesso
//           </p>

import React from "react";

//           <ul>
//               <li>
//                   1. nitin
//                   2. Baghel
//               </li>
//           </ul>
//         </div>
//       );
// }

// class based component

class MyComp extends React.Component{

    state = {
        Number: 0,
    };

    render = () =>{
        return(
            <div>
                <button onClick = { ()=>{
                    this.setState({Number: this.state.Number + 1})
                }}>
                    increment
                    
                    </button>
                    <button onClick = { ()=>{
                    this.setState({Number: this.state.Number - 1})
                }}>
                    decrement
                    
                    </button>

                <h1>{this.state.Number}</h1>

            </div>
        );

    };
}

export default MyComp;