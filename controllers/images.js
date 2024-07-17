class ImageController {
  constructor ({ imageModel }) {
    this.imageModel = imageModel;
  }

  cloudinaryUpload = async (req, res) => {
    const { file } = req;
    const image = await this.imageModel.cloudinaryUpload({ file });
    if (!image) {
      return res.status(409).json({ error: 'Failed uploading image' });
    }
    res.status(201).json({ public_id: image.public_id, url: image.url });
  };

  upload = async (req, res) => {
    const { id } = req.params;
    const { publicId, url } = req.body;
    const newImage = await this.imageModel.upload({ publicId, url, productId: id });
    if (!newImage) {
      return res.status(409).json({ error: 'Failed uploading image' });
    }
    res.status(201).json({ message: 'Image uploaded' });
  };

  deleteCurrent = async (req, res) => {
    const { id } = req.params;
    const deletedImage = await this.imageModel.deleteCurrent({ id });
    if (!deletedImage) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.status(200).json({ message: 'Image deleted' });
  };

  deletePrevious = async (req, res) => {
    const { id } = req.params;
    const deletedImage = await this.imageModel.deletePrevious({ id });
    if (!deletedImage) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.status(200).json({ message: 'Image deleted' });
  };
}

export { ImageController };
