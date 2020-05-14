from flask import Flask, render_template, send_from_directory
from flask_socketio import SocketIO, emit
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/manager')
def manager():
    return render_template('manager.html')

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)


@socketio.on('prompt', namespace='/socket')
def test_message(message):
    print(str(message))
#     promptmsg = message['promptmsg']
#     promptcolor = message['promptcolor']
    emit('prompt_alert', message, namespace='/socket', broadcast=True)
    print("Emitted prompt_alert")

@socketio.on('prompter_connected')
def confirm_p(msg):
    print("PROMPTER CONNECTED")

@socketio.on('manager_connected')
def confirm_m(msg):
    print("MANAGER CONNECTED")

if __name__ == '__main__':
    socketio.run(app)
