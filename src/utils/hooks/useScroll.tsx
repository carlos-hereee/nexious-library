import { getElementDimensions } from "@nxs-utils/app/scrollToElement";
import type {
  CardinalDirectionProps,
  ShowScrollProps,
  ScrollTargetProps,
} from "nxs-typography";
import { useState } from "react";

export const useScroll = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [direction, setDirection] = useState<CardinalDirectionProps>("up");
  const [showScroll, setShow] = useState<ShowScrollProps>({
    down: false,
    east: false,
    left: false,
    north: false,
    right: false,
    south: false,
    up: false,
    west: false,
  });

  const outputElementDimensions = (element: HTMLElement) => {
    return setDimensions({ width: element.scrollWidth, height: element.scrollHeight });
  };

  const handleScroll = (element: HTMLElement) => {
    const currentPosition = element.scrollTop;
    const bottomHeight = element.offsetHeight;
    const atTop = currentPosition < 30;
    const atMid = currentPosition > 30 && currentPosition + 20 < bottomHeight;
    const atBot = currentPosition + 20 > bottomHeight;
    if (atTop) {
      setShow({ ...showScroll, north: !atTop, up: !atTop, down: atTop, south: atTop });
    } else if (atMid && !atBot) {
      setShow({ ...showScroll, north: atMid, up: atMid, down: atMid, south: atMid });
    } else if (atBot) {
      setShow({ ...showScroll, north: atBot, up: atBot, down: !atBot, south: !atBot });
    }
  };

  const watchElement = (id: string, targets: ScrollTargetProps) => {
    const element = document.getElementById(id);
    if (element) {
      if (targets.height) {
        const isShow = element.scrollHeight > targets.height;
        setShow({ ...showScroll, north: isShow, up: isShow, down: !isShow, south: !isShow });
      }
      if (targets.width) {
        const isShow = element.scrollWidth > targets.width;
        setShow({ ...showScroll, left: !isShow, right: !isShow, east: isShow, west: isShow });
      }
      new ResizeObserver(() => outputElementDimensions(element)).observe(element);
      element.addEventListener("scroll", () => handleScroll(element));
    }
  };

  return { dimensions, direction, setDirection, showScroll, watchElement };
};
