const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function runAllTasks() {
  try {
    await client.connect();
    const db = client.db('plp_bookstore');
    const books = db.collection('books');

    // ==========================
    // 📘 Task 3: Advanced Queries
    // ==========================
    console.log("\n=== Task 3: Advanced Queries ===");

    const booksInGenre = await books.find({ genre: "Fantasy" }).toArray();
    console.log("3.1 Books in Fantasy:", booksInGenre);

    const booksAfter2015 = await books.find({ published_year: { $gt: 2015 } }).toArray();
    console.log("3.2 Books after 2015:", booksAfter2015);

    const booksByJK = await books.find({ author: "J.K. Rowling" }).toArray();
    console.log("3.3 Books by J.K. Rowling:", booksByJK);

    const updatePrice = await books.updateOne({ title: "The Hobbit" }, { $set: { price: 19.99 } });
    console.log("3.4 Price updated:", updatePrice.modifiedCount);

    const deleteTwilight = await books.deleteOne({ title: "Twilight" });
    console.log("3.5 Twilight deleted:", deleteTwilight.deletedCount);

    const inStockAndRecent = await books.find({
      $and: [
        {in_stock: true},
        {published_year: { $gt: 2010 }}
        ]
    }).toArray();
    console.log("3.6 In-stock and recent books:", inStockAndRecent);

    const projected = await books.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray();
    console.log("3.7 Projection (all books):", projected);

    const filteredProjected = await books.find(
      { in_stock: true, published_year: { $gt: 2010 } },
      { projection: { title: 1, author: 1, price: 1, _id: 0 } }
    ).toArray();
    console.log("3.8 Filtered Projection:", filteredProjected);

    const sortedAsc = await books.find().sort({ price: 1 }).toArray();
    console.log("3.9 Sorted ascending by price:", sortedAsc);

    const sortedDesc = await books.find().sort({ price: -1 }).toArray();
    console.log("3.10 Sorted descending by price:", sortedDesc);

    const page1 = await books.find().limit(5).toArray();
    console.log("3.11 Page 1:", page1);

    const page2 = await books.find().skip(5).limit(5).toArray();
    console.log("3.12 Page 2:", page2);


    // ===============================
    // 🧮 Task 4: Aggregation Pipeline
    // ===============================
    console.log("\n=== Task 4: Aggregation ===");

    const avgPriceByGenre = await books.aggregate([
      { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
    ]).toArray();
    console.log("4.1 Average price by genre:", avgPriceByGenre);

    const topAuthor = await books.aggregate([
      { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
      { $sort: { totalBooks: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log("4.2 Top author by book count:", topAuthor);

    const byDecade = await books.aggregate([
      {
        $project: {
          decade: {
            $concat: [
              { $toString: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } },
              "s"
            ]
          }
        }
      },
      { $group: { _id: "$decade", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log("4.3 Books by decade:", byDecade);


    // ==========================
    // 🚀 Task 5: Indexing & Explain
    // ==========================
    console.log("\n=== Task 5: Indexing ===");

    const titleIndex = await books.createIndex({ title: 1 });
    console.log("5.1 Index on title created:", titleIndex);

    const compoundIndex = await books.createIndex({ author: 1, published_year: 1 });
    console.log("5.2 Compound index created:", compoundIndex);

    const explainTitleQuery = await books.find({ title: "The Hobbit" }).explain("executionStats");
    console.log("5.3 Explain on title search:", explainTitleQuery.executionStats);

    const explainCompound = await books.find({ author: "J.K. Rowling", published_year: 2007 }).explain("executionStats");
    console.log("5.3 Explain on compound index search:", explainCompound.executionStats);

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
  }
}

runAllTasks();
