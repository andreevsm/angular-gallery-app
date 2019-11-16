export interface IImage {
  alt_description: string;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    thumb: string;
  };
}

export interface ISearchImageData {
  total: number;
  total_pages: number;
  results: IImage[];
}
