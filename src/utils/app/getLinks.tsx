import type { LinkProp } from "nxs-typography";

type Links = { word: string; link: string }[];

/**
 * TODO
 * @param param0
 * @returns
 */
export const getLinks = (hyperlinks: Links, body?: string): LinkProp[] => {
  const arr: LinkProp[] = [];
  if (body) {
    for (let i = 0; i < hyperlinks.length; i += 1) {
      const { word, link } = hyperlinks[i];
      const split = body.split(word);
      if (arr.some((a) => a.data.includes(word))) {
        const res = arr.filter((a) => a.data.includes(word));
        const idx = arr.indexOf(res[0]);
        const spt = arr[idx].data.split(word);
        arr.splice(idx, 1, { isLink: false, data: spt[0], link: "" });
        arr.splice(idx + 1, 0, { isLink: true, data: word, link });
        arr.splice(idx + 2, 0, { isLink: false, data: spt[1], link: "" });
      } else {
        arr.push({ isLink: false, data: split ? split[0] : "", link: "" });
        arr.push({ isLink: true, data: word, link });
        arr.push({ isLink: false, data: split ? split[1] : "", link: "" });
      }
    }
  }
  return arr;
};
