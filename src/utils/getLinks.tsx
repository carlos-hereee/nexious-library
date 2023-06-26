type Links = {
  links: { word: string; link: string }[];
  response: string;
};
export const getLinks = ({
  links,
  response,
}: Links): { str: string; isLink: boolean; link: string }[] => {
  let arr: { str: string; isLink: boolean; link: string }[] = [];
  for (let i = 0; i < links.length; i++) {
    const { word, link } = links[i];
    let split = response.split(word);
    arr.push({ isLink: false, link, str: split[0] });
    arr.push({ isLink: true, link, str: link });
    arr.push({ isLink: false, link, str: split[1] });
  }
  return arr;
};
