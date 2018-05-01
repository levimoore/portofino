import React, { Component } from 'react';
import { observer } from 'mobx-react';
import store from './appstore.js';
import { Grid, Table } from 'semantic-ui-react';
import moment from 'moment';

@observer
class HelloLogs extends Component {
  componentDidMount() {
    this.props.store.fetchHelloWorldData();
  }
  convertTime(epoch){
    return moment.unix(epoch).format('dddd, MMMM Do, YYYY h:mm:ss A')
  }
  render(){
    const logData = this.props.store.hellologs;
    console.log(logData);
    let Rows = logData.map((data) => {
      return <Table.Row key={data.id}>
              <Table.Cell textAlign='right'>{data.ip}</Table.Cell>
              <Table.Cell textAlign='right'>{this.convertTime(data.timestamp)}</Table.Cell>
              </Table.Row>
    })
    return(
      <div>
      <Grid container centered columns={1}>
      <Table striped celled structured>
      <Table.Header>
        <Table.Row>
        <Table.HeaderCell colSpan='2' textAlign='center'>Hello World Logs</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
        <Table.HeaderCell colSpan='1' textAlign='center'>IP Address</Table.HeaderCell>
        <Table.HeaderCell colSpan='1' textAlign='center'>Time of Visit</Table.HeaderCell>
        </Table.Row>
        </Table.Header>
        <Table.Body>
        { Rows }
        </Table.Body>
      </Table>
      </Grid>
      </div>
    )
  }
}

export default HelloLogs;