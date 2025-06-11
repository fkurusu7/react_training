import AccordionApp from './minis/accordion/AccordionApp';
import CountryCapitalGame from './minis/game/country-capital/CountryCapitalGame';
import OTPApp from './minis/otp/OTPApp';
import Pagination from './minis/pagination/Pagination';
import PasswordGenerator from './minis/passgen/PasswordGenerator';
import PomodoroTimer from './minis/pomodoro/PomodoroTimer';
import Stepper from './minis/stepper/Stepper';
import TooltipApp from './minis/tooltip/TooltipApp';

const projects = [
  {
    id: `${new Date().toISOString()} + ${crypto.randomUUID()}`,
    name: 'Tooltip',
    component: TooltipApp,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adus doloribus id quae commodi laboriosam explicabo.',
  },
  {
    id: `${new Date().toISOString()} + ${crypto.randomUUID()}`,
    name: 'Accordion',
    component: AccordionApp,
    description:
      'Lorem ipsumdolor sit amet consectetur adipisicing elit. Ad explicabo.',
  },
  {
    id: `${new Date().toISOString()} + ${crypto.randomUUID()}`,
    name: 'OTP',
    component: OTPApp,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adus doloribus id quae commodi laboriosam explicabo.',
  },
  {
    id: `${new Date().toISOString()} + ${crypto.randomUUID()}`,
    name: 'Pagination',
    component: Pagination,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adus doloribus id quae commodi laboriosam explicabo.',
  },
  {
    id: `${new Date().toISOString()} + ${crypto.randomUUID()}`,
    name: 'Stepper',
    component: Stepper,
    description: 'Stepping like in a ecommerce cart!',
  },
  {
    id: `${new Date().toISOString()} + ${crypto.randomUUID()}`,
    name: 'Game Match',
    component: CountryCapitalGame,
    description: 'Match country with its capital',
  },
  {
    id: `${new Date().toISOString()} + ${crypto.randomUUID()}`,
    name: 'Password Generator',
    component: PasswordGenerator,
    description:
      'Generate a password with lowercase, uppercase letters, numbers and symbols',
  },
  {
    id: `${new Date().toISOString()} + ${crypto.randomUUID()}`,
    name: 'Pomodoro Timer',
    component: PomodoroTimer,
    description: 'Simple Pomodoro Timer',
  },
];

export default projects;
