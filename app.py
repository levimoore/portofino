import time

import redis
from flask import Flask, jsonify, request


app = Flask(__name__)
r = redis.Redis(host='redis', port=6379)

@app.route('/v1/hello-world')
def helloworld():
    visit = {'ip': request.remote_addr, 'timestamp': int(time.time())}
    r.append('hello-world', visit)
    return jsonify(
        message='hello world')

'''
Test adding new endpoint
@app.route('/v1/foo-bar')
def foobar():
    visit = {'ip': request.remote_addr, 'timestamp': int(time.time())}
    r.append('foo-bar', visit)
    return jsonify(
        message='foo bar')
'''

@app.route('/v1/logs')
def logs():
    keys = r.keys()
    data = []
    for key in keys:
        endpoint = {'endpoint': key}
        data.append(endpoint)
        value = r.get(key)
        logs = {'logs': value}
        data.append(logs)
    return jsonify(logset=data)

@app.route('/v1/<endpoint>/logs')
def endpointlogs(endpoint):
    value = r.get(endpoint)
    return jsonify(logs=value)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)