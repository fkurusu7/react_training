import AccordionApp from "./minis/accordion/AccordionApp";
import OTPApp from "./minis/otp/OTPApp";
import TooltipApp from "./minis/tooltip/TooltipApp";

const projects = [
  {
    id: `${new Date().toISOString()} + ${crypto.randomUUID()}`,
    name: "Tooltip",
    component: TooltipApp,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adus doloribus id quae commodi laboriosam explicabo.",
  },
  {
    id: `${new Date().toISOString()} + ${crypto.randomUUID()}`,
    name: "Accordion",
    component: AccordionApp,
    description:
      "Lorem ipsumdolor sit amet consectetur adipisicing elit. Ad explicabo.",
  },
  {
    id: `${new Date().toISOString()} + ${crypto.randomUUID()}`,
    name: "OTP",
    component: OTPApp,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adus doloribus id quae commodi laboriosam explicabo.",
  },
];

export default projects;
