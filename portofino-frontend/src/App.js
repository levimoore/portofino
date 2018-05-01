import React, { Component } from 'react';
import store from './appstore.js';
import HelloLogs from './HelloLogs.js';
import AllLogs from './AllLogs.js';
import { Header, Icon } from 'semantic-ui-react'

class App extends Component {
  render(){
    return(
      <div className='app'>
      <Header as='h2' icon textAlign='center'>
      <Icon name='clock' circular />
      <Header.Content>
        Portofino Labs API Visits
      </Header.Content>
    </Header>
        <HelloLogs store={store}/>
        <AllLogs store={store}/>
      </div>
    )
  }
}

export default App;