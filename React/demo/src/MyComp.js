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
    render = () =>{
        return(
            <div>
                <h1>Hello this is class based component</h1>
            </div>
        );

    };
}

export default MyComp;