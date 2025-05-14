/* 
- Bachelor's or Master's degree in Computer Science, Software Engineering, or a related field.
- Proven experience as a Front-End Developer or in a similar role.
- Strong understanding of front-end development principles and practices.
- Proficiency in front-end technologies such as HTML, CSS, JavaScript, and related frameworks (e.g., React, Angular, Vue.js).
- Experience with responsive web design and mobile optimization.
- Knowledge of cross-browser compatibility and accessibility standards.
- Excellent problem-solving and analytical skills.
- Ability to work independently and collaboratively in a team

- Familiarity with version control systems (e.g., Git).
- Experience with front-end build tools and package managers.
- Understanding of user interface and user experience design principles.
- Knowledge of front-end testing frameworks.
- Previous experience with RESTful APIs and web services.

 */

/* OUTPUT:
{
  alice: [
    {item: "burger", quantity: 2},
    {item: "coker", quantity: 1},
    {item: "fries", quantity: 3},
  ],
  bob: [
    {item: "frie", quantity: 2},
    {item: "hotdog", quantity: 4},
  ],
}
{
  alice: [
    { item: 'burger', quantity: 2 },
    { item: 'coke', quantity: 1 },
    { item: 'fries', quantity: 3 }
  ],
  bob: [ 
    { item: 'fries', quantity: 2 }, 
    { item: 'hotdog', quantity: 4 } 
  ]
}

*/
const orders = [
  { orderId: 1, customer: "alice", item: "burger", quantity: 2 },
  { orderId: 2, customer: "bob", item: "fries", quantity: 2 },
  { orderId: 3, customer: "alice", item: "coke", quantity: 1 },
  { orderId: 4, customer: "bob", item: "hotdog", quantity: 4 },
  { orderId: 5, customer: "alice", item: "fries", quantity: 3 },
];

const groupOrderByCustomer = orders.reduce((acc, order) => {
  const { customer, item, quantity } = order;

  // if customer name does not exist, set it to a new empty array
  if (!acc[customer]) acc[customer] = [];

  // push the data into the key (customer name) object
  acc[customer].push({ item, quantity });

  return acc;
}, {});

console.log(groupOrderByCustomer);
