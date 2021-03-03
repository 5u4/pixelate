export class ImageUtil {
  public static readonly NUMBER_OF_IMG_DATA_CHANNELS = 4;
  public static readonly instance = new ImageUtil();

  /**
   * @param img
   * @param width
   * @param height
   */
  public getImageDataFromElement(
    img: HTMLImageElement,
    width?: number,
    height?: number
  ) {
    const { canvas, ctx } = this.makeCanvasContext();
    if (img.width === 0) return new ImageData(width || 1, height || 1);
    canvas.width = width || img.width;
    canvas.height = height || img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  /**
   * @param data
   */
  public getSrcFromImageData(data: ImageData) {
    const { canvas, ctx } = this.makeCanvasContext();
    canvas.width = data.width;
    canvas.height = data.height;
    ctx.putImageData(data, 0, 0);
    return canvas.toDataURL();
  }

  /**
   * @param data
   * @param blockSize
   */
  public pixelate(data: ImageData, blockSize: number) {
    // Make sure the starting pixel is in boundary
    for (let r = 0; r * blockSize < data.height; r++) {
      for (let c = 0; c * blockSize < data.width; c++) {
        // Collect block pixels
        const pixelIndices: number[] = [];
        // Make sure each pixel is in boundary
        for (let i = 0; i < blockSize; i++) {
          const x = i + r * blockSize;
          if (x >= data.height) break;
          for (let j = 0; j < blockSize; j++) {
            const y = j + c * blockSize;
            if (y >= data.width) break;
            pixelIndices.push(this.getPixelColorIndex(data, x, y));
          }
        }

        // For each channel, assign pixels to the averaged color
        for (
          let channel = 0;
          channel < ImageUtil.NUMBER_OF_IMG_DATA_CHANNELS;
          channel++
        ) {
          const avg = this.averagingPixels(
            pixelIndices.map((i) => data.data[i + channel])
          );
          pixelIndices.forEach((i) => (data.data[i + channel] = avg));
        }
      }
    }
  }

  /**
   * @param data
   * @param r
   * @param c
   * @param channel
   */
  private getPixelColorIndex(
    data: ImageData,
    r: number,
    c: number,
    channel: number = 0
  ) {
    return (
      (r * data.width + c) * ImageUtil.NUMBER_OF_IMG_DATA_CHANNELS + channel
    );
  }

  /**
   * @param colors
   */
  private averagingPixels(colors: number[]) {
    return colors.reduce((sum, color) => sum + color, 0) / colors.length;
  }

  /**
   * Make a canvas and get the 2d context from it
   */
  private makeCanvasContext() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Unable to get canvas 2D context");
    return { canvas, ctx };
  }
}
