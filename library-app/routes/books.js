// express router
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

//search 
router.get('/search', (req,res) => {
    res.render('search');

});

router.post('/add', async (req, res) => {
        const { title, authors, thumbnail, copies } = req.body;
      
        if(!copies || isNaN(copies) || copies < 1){
            return res.send('Error: copies must be a number >= 1')
        }
      
        const authorsArray = authors 
                            ? authors.split(',').map(a => a.trim()) 
                            : ['Unknown'];
      
        // check if book already exists (same title)
        let book = await Book.findOne({ title: title });
      
        if (book) {
            // if exists, increment copies
            book.totalCopies += Number(copies);
            book.availableCopies += Number(copies);
            await book.save();
        } else {
            // create new book
            await Book.create({ 
                title,
                authors: authorsArray,
                thumbnail,
                totalCopies: Number(copies),
                availableCopies: Number(copies)
            });
        }
      
        res.redirect('/books/list');
});
      

//library list
router.get('/list', async(req, res) =>{
    const books = await Book.find();
    console.log(books);
    res.render('list', {books});

});

router.get('/borrow', (req, res) => {
  res.render('borrow_search');
});


router.post('/borrow', async (req, res) => {
  const { query } = req.body;
  const regex = new RegExp(query, 'i'); 
  const books = await Book.find({ title: regex });
  res.render('borrow_results', { books, query });
});


router.post('/borrow/:id', async (req, res) => {
  const { name, date } = req.body;
  const book = await Book.findById(req.params.id);
  if (!book) return res.send('Book not found');

  if (book.availableCopies > 0) {
    book.availableCopies--;
    book.borrowRecords.push({ name, date });
    await book.save();
    res.redirect('/books/borrow'); 
  } else {
    res.send('No copies available');
  }
});



module.exports = router; 



