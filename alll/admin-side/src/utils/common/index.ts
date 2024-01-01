import Config from "configs";

export const getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const getLinkImage = (type: string, imageLink: string) => {
  if (!imageLink && type !== "user") return "";
  if (!imageLink && type === "user")
    return "https://www.unipulse.tokyo/en/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png";

  const endpoint = Config.getBaseConfig();
  const imageEncode = encodeURIComponent(imageLink);
  return `${endpoint.domain}/${type}/image/${imageEncode}`;
};

export const getAdminLinkImage = (type: string, imageLink: string) => {
  if (!imageLink && type !== "user") return "";
  if (!imageLink && type === "user")
    return "https://www.unipulse.tokyo/en/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png";

  const endpoint = Config.getBaseConfig();
  const imageEncode = encodeURIComponent(imageLink);
  return `${endpoint.domain}/admin/${type}/image/${imageEncode}`;
};

export const numberFormat = (number: Number) => {
  return number.toLocaleString();
};

export const blobToFile = (theBlob: Blob | any, fileName: string): File => {
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;

  return <File>theBlob;
};
