import socketio
import base64
import os


sio = socketio.Server()
app = socketio.WSGIApp(sio, static_files={
    '/': './static/'
})


@sio.event
def connect(sid, data):
    print(sid, 'connected')


@sio.event
def disconnect(sid):
    print(sid, 'disconnected')


def encode(name):
    binary_fc = open(name, 'rb').read()
    base64_utf8_str = base64.b64encode(binary_fc).decode('utf-8')
    ext = name.split('.')[-1]
    return f'data:image/{ext};base64,{base64_utf8_str}'


def generate(name):
    ...  # TODO: MODEL
    return encode(name)


@sio.event
def make(sid, data):
    name = 'static/images/new.png'
    os.remove(name)
    data = data.replace('data:image/png;base64,', '').replace(' ', '+')
    data = base64.b64decode(data)
    with open(name, 'wb') as f:
        f.write(data)
    sio.emit('return', generate(name))
