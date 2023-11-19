import {
  faCcMastercard,
  faCcVisa,
  faFacebook,
  faInstagram,
  faPaypal,
  faTwitter,
  // TODO: new twitter logo
  // faXTwitter,
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
  faCancel,
  faCheckCircle,
  faCircle,
  faCircleChevronLeft,
  faCircleChevronRight,
  faCircleDot,
  faCircleNotch,
  faDoorClosed,
  faEnvelope,
  faEye,
  faEyeSlash,
  faFlagUsa,
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
  faLock,
  faMoneyBill,
  faPaperPlane,
  faQuestion,
  faRefresh,
  faRightLong,
  faSave,
  faShoePrints,
  faShoppingCart,
  faSpinner,
  faSquareCheck,
  faStar,
  faStore,
  faUpLong,
  faUsd,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import type { IconDefinition } from "@fortawesome/free-brands-svg-icons";

type SVGProp = {
  [key: string]: IconDefinition;
};
const svg: SVGProp = {
  about: faInfo,
  accessories: faImage,
  all: faGlobe,
  appointments: faSquareCheck,
  back: faLeftLong,
  goBack: faLeftLong,
  booking: faCalendarAlt,
  booked: faSquareCheck,
  burger: faBars,
  cashapp: faMoneyBill,
  cancel: faCancel,
  check: faCheckCircle,
  checkout: faShoppingCart,
  contact: faEnvelope,
  cross: faX,
  circle: faCircleNotch,
  confirm: faPaperPlane,
  dot: faCircleDot,
  dashboard: faUser,
  eye: faEye,
  eyeSlash: faEyeSlash,
  flag: faGlobe,
  FAQ: faQuestion,
  faq: faQuestion,
  facebook: faFacebook,
  flagEnglish: faFlagUsa,
  first: faCircleChevronLeft,
  games: faGamepad,
  heart: faHeart,
  home: faHome,
  instagram: faInstagram,
  left: faLeftLong,
  leftArrow: faLeftLong,
  manicure: faHands,
  mastercard: faCcMastercard,
  paypal: faPaypal,
  pedicure: faShoePrints,
  pricing: faUsd,
  prev: faLeftLong,
  nail: faHandSpock,
  loading: faSpinner,
  login: faUser,
  submit: faPaperPlane,
  save: faSave,
  star: faStar,
  schedule: faCalendarAlt,
  services: faListCheck,
  secure: faLock,
  spinner: faSpinner,
  store: faStore,
  today: faCalendarDay,
  testimonials: faBullseye,
  twitter: faTwitter,
  top: faUpLong,
  user: faUser,
  uncheck: faCircle,
  right: faRightLong,
  refresh: faRefresh,
  next: faRightLong,
  last: faCircleChevronRight,
  logout: faDoorClosed,
  visa: faCcVisa,
  wig: faUser,
  x: faTwitter,
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
library.add(svg);
export { svg };
