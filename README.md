# JS Node HTML to PDF Service

This is a Node.js service that allows you to convert HTML pages to PDF documents using the `puppeteer` library.

## Installation

To use this service, you must have Node.js installed on your system. Then, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies by running `npm install`.
3. Run the server using the command `npm start`.
4. The server will start and listen on port 3000 by default

## Usage

Make a get request with a json body to the end point `http://localhost:3000/url`

json body:

```json
{
    "url":"http://google.com",
    "filename":"haha.pdf"
}
```

## Contributing

Contributions are welcome! If you have an idea for a new feature or want to report a bug, please open an issue on GitHub. Pull requests are also welcome.
