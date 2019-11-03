import { Message } from "/message";
import { AssetLoader, Asset } from "/assets";
import { ImageLoader } from "/assets/loader";

const MESSAGES = { ASSET_LOADED: name => `ASSET_LOADED::${name}` };

export class AssetManager {
  private static loaders: AssetLoader[] = [];
  private static loaded: { [name: string]: Asset } = {};

  static init = () => {
    AssetManager.loaders.push(new ImageLoader());
  };

  static addLoader = (loader: AssetLoader) => {
    AssetManager.loaders.push(loader);
  };

  static loadAsset = (name: string) => {
    const extension = name
      .split(".")
      .pop()
      .toLowerCase();

    for (const l of AssetManager.loaders) {
      if (l.extensions.includes(extension)) {
        l.loadAsset(name);
        return;
      }
    }

    console.warn(`Could not load asset: ${name}, extension: ${extension} is not supported`);
  };

  static onLoad = (asset: Asset) => {
    AssetManager.loaded[asset.name] = asset;
    Message.send(MESSAGES.ASSET_LOADED(asset.name), AssetManager, asset);
  };

  static getAsset = (name: string) => (AssetManager.isLoaded(name) ? AssetManager.loaded[name] : AssetManager.loadAsset(name));

  static isLoaded = (name: string): boolean => !!AssetManager.loaded[name];
}
