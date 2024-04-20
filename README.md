# GRANT EASE
## SD Project 2024

This project was bootstrapped with [Vite](https://vitejs.dev/) and uses [PNPM](https://pnpm.io/) as the package manager.
- To install global dependancies:
    ```shell
    npm i -g pnpm nodemon serve npm-run-all
    ```

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [PNPM](https://pnpm.io/) installed on your machine.

### Installation

1. Clone the repository.
    ```shell
    git clone https://github.com/TheNumbered/funding-request.git
    ```

2. Navigate to the project directory.
    ```shell
    cd funding-request
    ```

3. Install the dependencies using PNPM.
    ```shell
    pnpm install
    ```

### Development

To start the development server, run the following command:
    ```
    pnpm dev
    ```
    
### Testing The App
To the the app in contained environment, run the following command:
    ```
    docker compose up -d
    ```

### Production
To build for production, run the following command:
    ```
    pnpm build
    ```

* Some file have hidden, to show these files navigate to ``` .vscode/settings.json ``` and comment out the file you want to show