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
  return { dimensions, getDimensions, direction, setDirection, showScroll };
};
