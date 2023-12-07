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

  const getDimensions = (id: string, targets: ScrollTargetProps) => {
    const element = getElementDimensions(id);
    setDimensions(element);
    if (targets.height) {
      const isShow = element.height > targets.height;
      setShow({ ...showScroll, north: isShow, up: isShow, down: isShow, south: isShow });
    }
    if (targets.width) {
      const isShow = element.width > targets.width;
      setShow({ ...showScroll, left: isShow, right: isShow, east: isShow, west: isShow });
    }
  };
  const watchElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const outputElement = () => {
        return setDimensions({ width: element.scrollWidth, height: element.scrollHeight });
      };
      const isScrolled = () => {
        const currentPosition = element.scrollTop;
        const maxHeight = element.scrollHeight;
        const bottomHeight = element.offsetHeight;
        const atTop = currentPosition < 50;
        const atMid = currentPosition > 50 && currentPosition + 50 < maxHeight;
        const atBot = currentPosition + 50 > bottomHeight;
        if (atTop) {
          setShow({ ...showScroll, north: !atTop, up: !atTop, down: atTop, south: atTop });
        } else if (atMid && !atBot) {
          setShow({ ...showScroll, north: atMid, up: atMid, down: atMid, south: atMid });
        } else if (atBot) {
          setShow({ ...showScroll, north: atBot, up: atBot, down: !atBot, south: !atBot });
        }
      };
      new ResizeObserver(outputElement).observe(element);
      element.addEventListener("scroll", isScrolled);
    }
  };

  return { dimensions, getDimensions, direction, setDirection, showScroll, watchElement };
};
