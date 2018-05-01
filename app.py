import time

import redis
import json
from flask import Flask, jsonify, request, render_template


app = Flask(__name__)
r = redis.Redis(host='redis', port=6379)

def addToRedis(endpoint, value):
    r.rpush(endpoint, value)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/v1/hello-world')
def helloworld():
    visit = {'ip': request.remote_addr, 'timestamp': int(time.time())}
    value = json.dumps(visit)
    addToRedis('hello-world', value)
    return jsonify(message='hello world')

'''
Test adding new endpoint
@app.route('/v1/foo-bar')
def foobar():
    visit = {'ip': request.remote_addr, 'timestamp': int(time.time())}
    value = json.dumps(visit)
    addToRedis('foo-bar', value)
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
        value = r.lrange(key, 0, -1)
        logs = {'logs': value}
        data.append(logs)
    response = jsonify(logset=data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/v1/<endpoint>/logs')
def endpointlogs(endpoint):
    value = r.lrange(endpoint, 0, -1)
    response = jsonify(logs=value)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)