export interface AssetLoader {
  readonly extensions: string[];
  loadAsset(name: string): void;
}
