import { observable, action } from 'mobx';
import fetch from 'isomorphic-fetch';
import uuid from 'uuid';
import * as R from 'ramda';

class HelloLogs {
  @observable id
  @observable ip
  @observable timestamp

  constructor (data){
    this.id = uuid.v1();
    this.ip = data.ip;
    this.timestamp = data.timestamp;
  }
}

class AllLogs {
  @observable id
  @observable ip
  @observable endpoint
  @observable timestamp

  constructor (data){
    this.id = uuid.v1();
    this.ip = data.ip;
    this.endpoint = data.endpoint;
    this.timestamp = data.timestamp;
  }
}
class appstore {
  @observable hellologs = [];
  @observable alllogs = [];

  processHelloData(data){
    let value = JSON.parse(data);
    this.hellologs.push(new HelloLogs(value));
  }

  processAllData(data){
    console.log(data);
    var endpointLens = R.lensPath(['logset', 0, 'endpoint']);
    var endpoint = R.view(endpointLens, data);
    var logsLens = R.lensPath(['logset', 1, 'logs']);
    var logs = R.view(logsLens, data);
    logs.forEach((log) => {
      let value = JSON.parse(log);
      value.endpoint = endpoint;
      this.alllogs.push(new AllLogs(value));
    });
  }

  fetchHelloWorldData() {
    fetch('http://localhost:5000/v1/hello-world/logs')
          .then((response) => {
            return response.json();
          }).then((data) => {
            console.log(data)
            data.logs.forEach(this.processHelloData.bind(this));
          })
    }
    fetchAllData() {
      fetch('http://localhost:5000/v1/logs')
            .then((response) =>{
              return response.json();
            }).then((data) => {
              console.log(data);
              this.processAllData(data);
            })
    }
}
let store = new appstore;

export default store;