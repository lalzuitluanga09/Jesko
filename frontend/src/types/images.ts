interface Images {
  id: number | string; // number for existing, string for new
  image_path?: string; // for existing
  file?: File;         // for new
  preview_url: string; // URL for rendering <img>
}

interface NewImage {
  file?: File;
  image_path?: string;
  preview_url?: string;
}

interface ProductImages {
  id: number,
  image_path: string,
  is_primary: boolean
}

export type { Images, NewImage, ProductImages };