import socketio


sio = socketio.Server()


@sio.on('make')
def make(sid):
    print('555')
    sio.emit('receive')
