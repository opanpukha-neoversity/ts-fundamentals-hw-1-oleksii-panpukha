import type { BookId, Genre, LoanStatus } from "./types";

export class Book {
  id: BookId;
  title: string;
  author: string;
  year: number;
  genre: Genre;

  status: LoanStatus = "available";
  borrowedBy: string | null = null;

  constructor(opts: {
    id: BookId;
    title: string;
    author: string;
    year: number;
    genre: Genre;
    status?: LoanStatus;
    borrowedBy?: string | null;
  }) {
    this.id = opts.id;
    this.title = opts.title;
    this.author = opts.author;
    this.year = opts.year;
    this.genre = opts.genre;

    if (opts.status !== undefined) this.status = opts.status;
    if (opts.borrowedBy !== undefined) this.borrowedBy = opts.borrowedBy;
  }

  getStatus() {
    return this.status;
  }

  markBorrowed(personName: string) {
    if (this.status === "borrowed") {
      throw new Error(`Already borrowed by ${this.borrowedBy}`);
    }

    this.status = "borrowed";
    this.borrowedBy = personName;
  }

  markReturned() {
    if (this.status === "available") {
      throw new Error("Already available");
    }
    this.status = "available";
    this.borrowedBy = null;
  }

  getInfo() {
    const base = `${this.title} — ${this.author} (${this.year}), ${this.genre}`;
    if (this.status === "available") {
      return `${base} [Available]`;
    }

    return `${base} [Borrowed by ${this.borrowedBy}]`;
  }
}
