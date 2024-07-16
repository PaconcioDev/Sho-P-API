class ImageController {
  constructor ({ imageModel }) {
    this.imageModel = imageModel;
  }

  upload = async (req, res) => {
    const { id } = req.params;
    const { file } = req;
    const imageUrl = await this.imageModel.upload({ file, productId: id });
    if (!imageUrl) {
      return res.status(409).json({ error: 'Failed uploading image' });
    }
    res.status(201).json(imageUrl);
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
