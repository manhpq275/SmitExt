import moment from "moment";

export function mapData(data: Array<any>, ip: any) {
  if (!data || data.length == 0) return [];
  const results: Array<any> = [];
  const browsers = Array.from(new Set(data.map((item: any) => item.browser)));
  const profiles = Array.from(new Set(data.map((item: any) => item.profile)));

  let stt = 0;
  browsers.forEach((b, bIdx) => {
    const tmpItem: Partial<any> = {};
    tmpItem["browser"] = b;

    profiles.forEach((p) => {
      tmpItem["profile"] = p;
      const groupItem = data.filter((d) => d.browser == b && d.profile == p);

      if (groupItem.length > 0) {
        results.push({ stt: stt + 1, browser: b, profile: p, data: groupItem, ip });
        stt += 1;
      }
    });
  });

  return results;
}

export function mapLoginData(data: Array<any>) {
  if (!data || data.length == 0) return [];
  return data.map((item, itemIdx) => ({ stt: itemIdx + 1, ...item }));
}

export function cookIpData(data: Array<any>) {
  if (!data || !data.length) return [];

  return data
    .sort((a: any, b: any) => (moment(b.createdAt) as any) - (moment(a.createdAt) as any))
    .map((c: any, cIdx: any) => ({
      ...c,
      key: cIdx + 1,
    }));
}

export function setColorStatus(status: any) {
  let color = "rgb(122, 122, 122)";
  status = typeof parseInt(status) == "number" ? parseInt(status) : status;

  switch (status) {
    case 1:
      color = "rgb(14, 236, 92)";
      break;
    case 2:
    case 'Die':
      color = "rgb(255, 34, 34)";
      break;
    case 3:
      color = "rgb(255, 199, 54)";
      break;
    case 4:
      color = "rgb(24, 119, 242)";
      break;
    case 'Live':
      color = "green";
      break;
    default:
      break;
  }
  return color;
}
