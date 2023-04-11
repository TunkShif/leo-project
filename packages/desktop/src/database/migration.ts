const sql = `
CREATE TABLE IF NOT EXISTS books (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
  cover BLOB,
  source TEXT NOT NULL
);
`

export default sql
