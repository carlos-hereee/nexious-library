import {
  faCcMastercard,
  faCcVisa,
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faPaypal,
  faTiktok,
  faTwitter,
  faXTwitter,
  faDiscord,
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
  faArrowDown,
  faArrowUp,
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
  faCopy,
  faDoorClosed,
  // faEdit,
  faEnvelope,
  faEye,
  faEyeSlash,
  faFileEdit,
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
  faMagnifyingGlass,
  faMoneyBill,
  faPaperPlane,
  faQuestion,
  faQuestionCircle,
  faRefresh,
  faRightLong,
  faSave,
  faShoePrints,
  faShoppingCart,
  faSpinner,
  faSquareCheck,
  faStar,
  faStore,
  faTabletAlt,
  faUpLong,
  faUsd,
  faUser,
  // faUserEdit,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { type IconDefinition } from "@fortawesome/free-brands-svg-icons";

type SVGProp = {
  [key: string]: IconDefinition;
};
const svg: SVGProp = {
  about: faInfo,
  arrowUp: faArrowUp,
  arrowDown: faArrowDown,
  accessories: faImage,
  account: faUser,
  all: faGlobe,
  app: faTabletAlt,
  apps: faStore,
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
  copy: faCopy,
  close: faX,
  circle: faCircleNotch,
  confirm: faPaperPlane,
  dot: faCircleDot,
  dashboard: faUser,
  eye: faEye,
  // edit: faEdit,
  edit: faFileEdit,
  // edit: faUserEdit,
  explore: faMagnifyingGlass,
  eyeSlash: faEyeSlash,
  flag: faGlobe,
  FAQ: faQuestion,
  faq: faQuestion,
  facebook: faFacebook,
  flagEnglish: faFlagUsa,
  first: faCircleChevronLeft,
  games: faGamepad,
  github: faGithub,
  heart: faHeart,
  home: faHome,
  hint: faQuestionCircle,
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
  discord: faDiscord,
  tiktok: faTiktok,
  logout: faDoorClosed,
  linkedin: faLinkedin,
  visa: faCcVisa,
  wig: faUser,
  x: faXTwitter,
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
  1: fa1,
  2: fa2,
  3: fa3,
  4: fa4,
  5: fa5,
  6: fa6,
  7: fa7,
  8: fa8,
  9: fa9,
  0: fa0,
};
library.add(svg);
export { svg };
