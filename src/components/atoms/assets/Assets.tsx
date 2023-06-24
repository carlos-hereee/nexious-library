import {
  faCcVisa,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  fa0,
  fa1,
  fa2,
  fa3,
  fa4,
  fa5,
  fa6,
  fa7,
  fa8,
  fa9,
  faBars,
  faBullseye,
  faCalendarAlt,
  faCalendarDay,
  faCheckCircle,
  faCircle,
  faCircleChevronLeft,
  faCircleChevronRight,
  faCircleDot,
  faCircleNotch,
  faEnvelope,
  faGamepad,
  faGlobe,
  faHands,
  faHandSpock,
  faHeart,
  faHome,
  faImage,
  faInfo,
  faLeftLong,
  faListCheck,
  faMoneyBill,
  faPaperPlane,
  faRefresh,
  faRightLong,
  faSave,
  faShoePrints,
  faShoppingCart,
  faSpinner,
  faSquareCheck,
  faStore,
  faUpLong,
  faUsd,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";

export const svg = {
  home: faHome,
  about: faInfo,
  services: faListCheck,
  booking: faCalendarAlt,
  accessories: faImage,
  contact: faEnvelope,
  checkout: faShoppingCart,
  pricing: faUsd,
  check: faCheckCircle,
  uncheck: faCircle,
  submit: faPaperPlane,
  dashboard: faUser,
  login: faUser,
  burger: faBars,
  instagram: faInstagram,
  twitter: faTwitter,
  wig: faUser,
  braids: faUser,
  nail: faHandSpock,
  all: faGlobe,
  flag: faGlobe,
  manicure: faHands,
  pedicure: faShoePrints,
  promotion: faBullseye,
  schedule: faCalendarAlt,
  today: faCalendarDay,
  booked: faSquareCheck,
  appointments: faSquareCheck,
  left: faLeftLong,
  right: faRightLong,
  prev: faLeftLong,
  next: faRightLong,
  first: faCircleChevronLeft,
  last: faCircleChevronRight,
  top: faUpLong,
  spinner: faSpinner,
  loading: faSpinner,
  circle: faCircleNotch,
  store: faStore,
  visa: faCcVisa,
  cashapp: faMoneyBill,
  heart: faHeart,
  save: faSave,
  x: faX,
  refresh: faRefresh,
  games: faGamepad,
  dot: faCircleDot,
  one: fa1,
  two: fa2,
  three: fa3,
  four: fa4,
  five: fa5,
  six: fa6,
  seven: fa7,
  eight: fa8,
  nine: fa9,
  zero: fa0,
};
export type IconNames = keyof typeof svg;
