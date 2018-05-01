import React, { Component } from 'react';
import { observer } from 'mobx-react';
import store from './appstore.js';
import { Grid, Table } from 'semantic-ui-react';
import moment from 'moment';

@observer
class AllLogs extends Component {
  componentDidMount() {
    this.props.store.fetchAllData();
  }
  convertTime(epoch){
    return moment.unix(epoch).format('dddd, MMMM Do, YYYY h:mm:ss A')
  }
	  render(){
	    const logData = this.props.store.alllogs;
	    console.log(logData);
	    let Rows = logData.map((data) => {
	      return <Table.Row key={data.id}>
	              <Table.Cell textAlign='right'>{data.endpoint}</Table.Cell>
	              <Table.Cell textAlign='right'>{data.ip}</Table.Cell>
	              <Table.Cell textAlign='right'>{this.convertTime(data.timestamp)}</Table.Cell>
	              </Table.Row>
	    })
	    return(
	      <div className='app'>
	      <Grid container centered columns={1}>
	      <Table striped celled structured>
	      <Table.Header>
	        <Table.Row>
	        <Table.HeaderCell colSpan='3' textAlign='center'>All Logs</Table.HeaderCell>
	        </Table.Row>
	        <Table.Row>
	        <Table.HeaderCell colSpan='1' textAlign='center'>Endpoint</Table.HeaderCell>
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


export default AllLogs;