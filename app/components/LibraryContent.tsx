'use client';

import Image from 'next/image';

const books = [
  {
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    isbn: "1544514212",
    url: "https://www.amazon.com/Almanack-Naval-Ravikant-Wisdom-Wealth/dp/1544514212"
  },
  {
    title: "Antifragile",
    author: "Nassim Nicholas Taleb",
    isbn: "0812979680",
    url: "https://www.amazon.com/Antifragile-Things-Gain-Disorder-Incerto/dp/0812979680"
  },
  {
    title: "The Defining Decade",
    author: "Meg Jay",
    isbn: "0446561754",
    url: "https://www.amazon.com/Defining-Decade-Your-Twenties-Matter/dp/0446561754"
  },
  {
    title: "The 4-Hour Workweek",
    author: "Tim Ferriss",
    isbn: "0307465357",
    url: "https://www.amazon.com/4-Hour-Workweek-Escape-Anywhere/dp/0307465357"
  },
  {
    title: "The Medici Effect",
    author: "Frans Johansson",
    isbn: "1591391865",
    url: "https://www.amazon.com/Medici-Effect-Breakthrough-Insights-Intersection/dp/1591391865"
  },
  {
    title: "Alchemy",
    author: "Rory Sutherland",
    isbn: "0062388428",
    url: "https://www.amazon.com/Alchemy-Curious-Science-Creating-Business/dp/0062388428"
  }
];

export default function LibraryContent() {
  return (
    <>
      <p className="section-quote">"I don't want to read all the books; I just want to read the best 100 over and over again." - Naval Ravikant</p>
      <p className="section-subtitle">A curated collection of books that have shaped my thinking.</p>
      <div className="books-grid">
        {books.map((book, index) => (
          <div key={index} className="book-item">
            <a href={book.url} target="_blank" rel="noopener noreferrer" className="book-link">
              <div className="book-cover">
                <Image
                  src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
                  alt={book.title}
                  fill
                  sizes="(max-width: 768px) 120px, 150px"
                />
              </div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="book-author">{book.author}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
