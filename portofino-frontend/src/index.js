import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './App';
import './style.css';
import 'semantic-ui-css/semantic.min.css';
import store from './appstore.js';

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       name: 'React'
//     };
//   }
//   componentDidMount() {
//     this.props.store.fetchData();
//   }

//   render() {
//     return (
//       <div>
//         <Hello name={this.props.store.name} />
//         <p>
//           Start editing to see some magic happen :)
//         </p>
//       </div>
//     );
//   }
// }

render(<App store={store}/>, document.getElementById('root'));
