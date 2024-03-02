const fs = require('fs');
const superagent = require('superagent');

// Callback method
// fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
//   if (err) return console.log('error reading file');

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log('No images found');

//       fs.writeFile('dog-image.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message);
//       });
//     });
// });

// ES6 promises method

/*
1. read file
2. fetch data
3. store the data in a new file
*/

/*
function readFilePro(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) reject('No file found (');
      resolve(data);
      console.log('Data fetching complete');
    });
  });
}

function writeFilePro(file, res) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, res.body.message, (err) => {
      if (err) reject("Couldn't write a file");
      resolve('File written complete');
      console.log('File written complete');
    });
  });
}

readFilePro(`${__dirname}/dog.txt`)
  .then((res) => {
    console.log('BREED:', res);
    return superagent.get(`https://dog.ceo/api/breed/${res}/images/random`);
  })
  .then((res) => {
    writeFilePro('dog-image.txt', res);
  })
  .catch((err) => {
    console.log(err.message || err);
  });
*/

// JS ES8 async await
function readFilePro(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) reject('No file found ('); // The same message will be shown on catch block
      resolve(data);
      console.log('Data fetching complete');
    });
  });
}

function writeFilePro(file, res) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, res.body.message, (err) => {
      if (err) reject("Couldn't write a file"); // The same message will be shown on catch block
      resolve('File written complete');
      console.log('File written complete');
    });
  });
}

async function getDogPic() {
  try {
    const data = await readFilePro(`${__dirname}/dogs.txt`);
    console.log('Dog Breed:', data);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    await writeFilePro(`dog-image.txt`, res);
  } catch (err) {
    console.log(err.message || err);
    throw err; // to reject whole promise and not to return any value and to throw an error
  }

  return 'Execution completed'; // can be returned any value after function fullfils or rejects promise. Note: No matter the promise is rejected or fullfilled the promise function always returns a value to avoid that use throw new Error method and catch the error in the catch block
}

// getDogPic()
//   .then((res) => {
//     console.log(res); // to access the returned value from promise using then method it
//   })
//   .catch((err) => {
//     console.log('Error 💥', err); // if there is any error which throw by throw method in the promise function this code will be executed
//   });

// Another way of writing same code and handling then catch using async await

(async () => {
  try {
    const returnedValue = await getDogPic();
    console.log(returnedValue);
  } catch (err) {
    console.log('Error 💥', err);
  }
})();
