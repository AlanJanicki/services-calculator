<h1 align="center">Services calculator (recruitment task)</h1>

## Test coverage

![Branches](./badges/coverage-branches.svg)![Functions](./badges/coverage-functions.svg)![Lines](./badges/coverage-lines.svg)![Statements](./badges/coverage-statements.svg)![Jest coverage](./badges/coverage-jest%20coverage.svg)

<details>
  <summary>Task description</summary>
  <p>
  A telecommunications company has approached with a request to create a pricing calculator for their services. 
  
  <strong>Sample data:</strong>
List of services:
• Internet
• Television
• Phone subscription
• 4K decoder

Service prices may vary depending on the selected year. Currently, we know the following prices:
• Internet costs 39 PLN in 2023, 49 PLN in 2024, and 59 PLN in 2025.
• Television costs 49 PLN in 2023, 49 PLN in 2024, and 59 PLN in 2025.
• The "Internet + Television" bundle costs less – 79 PLN in 2023, 89 PLN in 2024, 99 PLN in 2025.
• The "Internet + Phone Subscription" bundle costs 64 PLN each year.
• Phone subscription costs 29 PLN.
• The 4K decoder costs 29 PLN, and it's available for free in the "Internet + Television" bundle.

It doesn't make sense for a customer to order the "4K decoder" without ordering television. Ensure that the program calculates the most cost-effective solution for the user. Discounts do not stack – the most favorable solution for the user wins.

<strong>Objective: </strong>
Build a single-view application that allows the user to select the year and services they want to purchase from the available data. It should display the final price of the order (before and after promotions, without specifying individual products) below.

The data should be retrieved from an external source (e.g., a JSON file). Design a data model that you would like to receive from an external provider. Ensure that the model is readable, easy to modify (add another product, change prices, add more years), and ready for future development.

The program should work not only for the sample data mentioned above but also if the product data and price list change. It should implement solutions that allow for the necessary calculations based on the sample data (discounts, bundling options, inability to add a product dependent on others).

Implement the application using React technology. Ensure the cleanliness and high maintainability of your solution by following good programming practices that you are familiar with.

  </p>
</details>

## Main tech stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Jest](https://jestjs.io/)
- [Storybook](https://storybook.js.org/)
- [MSW](https://mswjs.io/)
- [Styled-components](https://styled-components.com/)
- [Docker](https://www.docker.com/)
- [Nginx](https://www.nginx.com/)
- [Husky](https://typicode.github.io/husky/)

## Getting Started

App is available [here](https://services-calculator.onrender.com/). <br />
Storybook is available [here](https://main--6474a243356017b536bcb093.chromatic.com). <br />
App is dockerized. <br /><br/>
<strong>Development</strong>

1. Clone or download repository
2. Run `cd client && npm install && npm start`

-- or using docker --

1. Clone or download repository
2. Run `make build && make up-dev`

<strong>Production</strong>
<br />
To start nginx container serving production build

1. Run `make build && make up`

## Contact

[e-mail](alan.janicki91@gmail.com)
