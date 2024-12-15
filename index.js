import fs from "fs";
import http from "http";

// TEMPLATE
const templateOverview = fs.readFileSync(
  "./templates/template-overview.html",
  "utf-8"
);
const templateCard = fs.readFileSync("./templates/template-card.html", "utf-8");
const templateProduct = fs.readFileSync(
  "./templates/template-product.html",
  "utf-8"
);

// DATA
const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataObj = JSON.parse(data);

// REPLACE-TEMPLATE FUNCTION
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

// SERVER
const server = http.createServer((req, res) => {
  const pathName = req.url;

  // OVERVIEW page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(templateCard, el))
      .join("");
    const output = templateOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
    res.end(output);

    // PRODUCT page
  } else if (pathName === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end("This is the PRODUCT");

    // API
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // NOT FOUND
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

// LISTENING TO THE SERVER
server.listen(3000, "localhost", () => {
  console.log("Server is running on port 3000");
});
