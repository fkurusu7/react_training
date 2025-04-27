import Accordion from "./minis/accordion/Accordion";
import OTP from "./minis/otp/OTP";

const projects = [
  {
    id: `${new Date().toISOString()} + ${crypto.randomUUID()}`,
    name: "Accordion",
    component: Accordion,
    description:
      "Lorem ipsumdolor sit amet consectetur adipisicing elit. Ad explicabo.",
  },
  {
    id: `${new Date().toISOString()} + ${crypto.randomUUID()}`,
    name: "OTP",
    component: OTP,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adus doloribus id quae commodi laboriosam explicabo.",
  },
];

export default projects;
