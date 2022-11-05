from PIL import Image
from PIL import ImageFilter
filename = 'src/assets/images/campus-test1.jpg'

with Image.open(filename) as img:
    img.load()

img_gray = img.convert("L")

embossed = img_gray.filter(ImageFilter.EMBOSS)
embossed.show()

img = embossed

img.save('src/assets/images/campus-test1.jpg')