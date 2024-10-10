export const blobToImage = (blob: Blob): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject('Error reading image');

    const image = new Image();
    image.onload = () => resolve(image);
    //成功：当图片加载成功（即 image.onload 事件触发时），它会调用 resolve(image)，此时 Promise 处于 resolved 状态，并返回 <img> 元素作为 Promise 的值。

    image.onerror = () => reject('Error reading image');//失败
    reader.onload = e => {
      const result = (e.currentTarget as any).result as string;
      image.src = result;
    };

    reader.readAsDataURL(blob);
  });
