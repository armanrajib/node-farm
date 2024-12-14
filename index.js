import fs from "fs";

// Synchronous way
const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textInput);

const textOutput = `This is what we know about the avocado: ${textInput}.\nCreated on ${new Date().toISOString()}`;
fs.writeFileSync("./txt/output.txt", textOutput, "utf-8");
console.log("File written successfully 🙂");

// Asynchronous way (callback hell)
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("ERROR! 💥");
  console.log(data1);

  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);

    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("File has been written 😊");
      });
    });
  });
});

console.log("Reading file...");
