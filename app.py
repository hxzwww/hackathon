import socketio
import base64


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


prefix = 'static/images/'
given_name = prefix + 'given_img.png'
made_name = prefix + 'made_img.png'


def encode():
    binary_fc = open(made_name, 'rb').read()
    base64_utf8_str = base64.b64encode(binary_fc).decode('utf-8')
    ext = made_name.split('.')[-1]
    return f'data:image/{ext};base64,{base64_utf8_str}'


def transform_img():
    ...  # TODO: MODEL
    return encode()


@sio.event
def make(sid, data):
    img, style = data
    img = img.replace('data:image/png;base64,', '').replace(' ', '+')
    img = base64.b64decode(img)
    with open(given_name, 'wb') as f:
        f.write(img)
    with open(made_name, 'wb') as f:
        f.write(img)
    sio.emit('return', transform_img())

