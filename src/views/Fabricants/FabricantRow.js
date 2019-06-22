// import React, { Component } from 'react';
// import FabricantModal from './FabricantModal.js'
// import { Button } from 'reactstrap'

// class FabricantRow extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {}
//     }
//     render() {
//         const { fabricant } = this.props;
//         return (
//             <tr key={fabricant._id}>
//                 <td>{fabricant.name}</td>
//                 <td style={{ display: 'flex', justifyContent: 'flex-end' }}>
//                     <Button
//                         className="float-left mr-1"
//                         color="danger"
//                         onClick={() => this.props.handleDelete(fabricant._id)}
//                     >
//                         &#10006;
//                 </Button>
//                     <FabricantModal
//                         id={fabricant._id}
//                         name={fabricant.name}
//                         btnColor="warning"
//                         btnText="&#9998;"
//                     />
//                 </td>
//             </tr>
//         );
//     }
// }

// export default FabricantRow;
