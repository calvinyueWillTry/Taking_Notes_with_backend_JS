//helps with read, write and append, because of lack of open server.
//page can't refresh? 
const fs = require('fs');
const util = require('util');
const readFromFile = util.promisify(fs.readFile);// Promise version of fs.readFile
// export function promisify: <TCustom extends Function>(fn: CustomPromisify<TCustom>): TCustom;
//     export function promisify<TResult>(
//         fn: (callback: (err: any, result: TResult) => void) => void,
//     ): () => Promise<TResult>;
//The promisify function has two overloads: 1st overload takes custom function (fn), returns the same fn with a Promise return type.
// 2) 2nd overload takes fn that accepts a callback function, and returns void. It converts this fn into a fn that returns a Promise instead.
//used to work with asynchronous functions that use callbacks and convert them into Promises.
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) => 
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => 
  //converts into a JSON string with an indentation of 4 spaces
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
    //callback function that logs "error" if one, or success message if content is successfully to the destination.
  );
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => { 
  fs.readFile(file, 'utf8', (err, data) => {//asynchronous to line 34?
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
      return parsedData;//returns array with new content
    }
  });
    //parses it as JSON, push/appends new content to the parsed data, then writes the updated 
    //data back to the same file using the writeToFile function from earlier.
};
module.exports = { readFromFile, writeToFile, readAndAppend };