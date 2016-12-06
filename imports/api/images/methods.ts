import { UploadFS } from "meteor/jalik:ufs";
import { ImagesStore } from './collection';

export function uploadFile(data: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const file = {
      name: data.name,
      type: data.type,
      size: data.size,
    };

    const upload = new UploadFS.Uploader({
      data,
      file,
      store: ImagesStore,
      onError: reject,
      onComplete: resolve
    });

    upload.start();
  });
}
