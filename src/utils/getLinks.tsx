import { LinkProp } from "@nxs-helpers/types";

type Links = {
  links: { word: string; link: string }[];
  body: string;
};
/**
 * TODO
 * @param param0
 * @returns
 */
export const getLinks = ({ links, body }: Links): LinkProp[] => {
  let arr: LinkProp[] = [];
  if (body) {
    for (let i = 0; i < links.length; i++) {
      const { word } = links[i];
      let split = body.split(word);
      if (arr.some((a) => a.data.includes(word))) {
        const res = arr.filter((a) => a.data.includes(word));
        const idx = arr.indexOf(res[0]);
        const split = arr[idx].data.split(word);
        arr.splice(idx, 1, { isLink: false, data: split[0] });
        arr.splice(idx + 1, 0, { isLink: true, data: word });
        arr.splice(idx + 2, 0, { isLink: false, data: split[1] });
      } else {
        arr.push({ isLink: false, data: split ? split[0] : "" });
        arr.push({ isLink: true, data: word });
        arr.push({ isLink: false, data: split ? split[1] : "" });
      }
    }
  }
  return arr;
};
