import Config from "configs";

export const getLinkIamge = (type: string, imageLink: string) => {
  if (imageLink) {
    const endpoint = Config.getBaseConfig();
    const imageEncode = encodeURIComponent(imageLink);
    return `${endpoint.domain}/${type}/image/${imageEncode}`;
  }
  else return "https://www.unipulse.tokyo/en/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
}

export const getAdminImage = (type: string, imageLink: string) => {
  if (imageLink) {
    const endpoint = Config.getBaseConfig();
    const imageEncode = encodeURIComponent(imageLink);
    return `${endpoint.domain}/admin/${type}/image/${imageEncode}`;
  }
  else return "https://www.unipulse.tokyo/en/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
}
