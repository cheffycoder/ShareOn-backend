const File = require("./Models/file");
const fs = require("fs"); // This is the fileSystem module provided by NodeJS

// Giving this script file an access to the DB connection as this will be run as a single unit by the scheduler.
const connectDB = require("./Config/db");
connectDB();

async function fetchData() {
  // Getting 24 hour previous time
  const dayBefore = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // Getting file from the DB which matches our query i.e. files whose date in ms is less than the date which is 24 hours old.
  const files = await File.find({ createdAt: { $lt: dayBefore } });
  console.log(files, "shivam")

  if (files.length) {
    for (const file of files) {
      // Handling error in deleting files
      try {
        // Removing data from storage i.e. from the Uploads folder.
        fs.unlinkSync(file.path);
        // Removing the files existence of the document from MongoDB
        await file.remove();
        console.log(`Succesfully deleted ${file.filename}`);
      } catch (err) {
        console.log(`Error while deleting file ${err}`);
      }
    }
    console.log("Job Done");
  }
}

/**
 * As the function is async thus, it will return a promise.
 * On which we can use then chaining to actually stop the script, as soon as the function has been completed.
 * Thus, we will run process.exit which will exit the node process
 */
fetchData().then(process.exit);
