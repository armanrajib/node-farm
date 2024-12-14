import fs from "fs";

// Reading from a file
const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textInput);

const textOutput = `This is what we know about the avocado: ${textInput}.\nCreated on ${new Date().toISOString()}.`;
// Writing to a file
fs.writeFileSync("./txt/output.txt", textOutput);
console.log("File written!");
