from torch import load
from PIL import Image
from torchvision import transforms
from models.networks import define_G
from collections import OrderedDict
import socketio
import base64
import torch

sio = socketio.Server()
app = socketio.WSGIApp(sio, static_files={
    '/': './static/'
})

model_dict = load('models/weights.pth')
new_dict = OrderedDict()
for k, v in model_dict.items():
    new_dict["model." + k] = v

model = define_G(3, 3, 64, 'unet_256', 'batch', True, 'normal', 0.02, [])
model.load_state_dict(model_dict)
model.eval()
transform = transforms.Compose(
    [transforms.Resize((256, 256)), transforms.ToTensor()]
)


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

from skimage.color import rgba2rgb
from skimage.io import imread
def transform_img():
    image = imread(given_name)
    image = rgba2rgb(image)
    image = transform(image)
    new_shape = (1,) + image.shape
    image = image.reshape(new_shape)
    print(image.shape)
    emoji = model(image)
    transform_to_pil = transforms.ToPILImage()
    emoji = transform_to_pil(emoji[0])
    emoji = emoji.resize((400, 400))
    emoji.save(made_name)
    return encode()


@sio.event
def make(sid, data):
    img, style = data
    img = img.replace('data:image/png;base64,', '').replace(' ', '+')
    img = base64.b64decode(img)
    with open(given_name, 'wb') as f:
        f.write(img)
    print(99999999)
    sio.emit('return', transform_img())
