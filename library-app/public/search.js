async function searchBooks(){
    const q = document.getElementById('query').value;
    const results = document.getElementById('results');

    const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${q}`
    );

    const data = await res.json();
    results.innerHTML = "";

    if (!data.items){
        results.innerHTML= "No results Found";
        return;
    }

    data.items.forEach(book => { 
        const title = book.volumeInfo.title || 'No title';
        const authors =  book.volumeInfo.authors && book.volumeInfo.authors.length > 0 
        ? book.volumeInfo.authors 
        : ['Unknown'];
        const thumbnail = book.volumeInfo.imageLinks?.thumbnail || '';
    
        results.innerHTML += `
          <div>
            <h3>${title}</h3>
            <p>Authors: ${authors.join(', ')}</p>
            ${thumbnail ? `<img src="${thumbnail}" alt="${title}">` : ''}
            <form method="POST" action="/books/add">
              <input type="hidden" name="title" value="${title}">
              <input type="hidden" name="authors" value="${authors.join(',')}">
              <input type="hidden" name="thumbnail" value="${thumbnail}">
              Copies: <input type="number" name="copies" min= "1" required>
              <button>Add to Library</button>
            </form>
          </div>
        `;
      });
 }
