import fs from "fs";
import http from "http";
import url from "url";

import { replaceTemplate } from "./modules/replaceTemplate.js";

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

// SERVER
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // OVERVIEW page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(templateCard, el))
      .join("");
    const output = templateOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
    res.end(output);

    // PRODUCT page
  } else if (pathname === "/product/") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product);
    res.end(output);

    // API
  } else if (pathname === "/api") {
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
