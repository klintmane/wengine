import { Asset, AssetManager } from "/assets";
import { AssetLoader } from "/assets/loader";

export class ImageAsset implements Asset {
  name: string;
  data: HTMLImageElement;

  constructor(name: string, data: HTMLImageElement) {}

  get width() {
    return this.data.width;
  }
  get height() {
    return this.data.height;
  }
}

export class ImageLoader implements AssetLoader {
  extensions = ["png", "jpg", "gif"];

  loadAsset = (name: string) => {
    const image = new Image();
    image.onload = () => this.onLoad(name, image);
    image.src = name;
  };

  private onLoad = (name: string, image: HTMLImageElement) => {
    console.log("Image Loaded:", name, image);
    const asset = new ImageAsset(name, image);
    AssetManager.onLoad(asset);
  };
}
