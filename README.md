## Domestic repairs backend server

- Database type: **NOSql**
- Database: **MongoDB**
- Model library: **Mongoose**
- Server type: **RESTful**
- Server routing: **expressjs**
- Functions: implemented **session authentication**
- HTML renderer engine: **ejs**

#### Folder schema

- `/src/controllers` - stores router files that handles requests
- `/src/models` - stores collection model classes that retrieves, modifies data (under CRUD framework)
- `/src/schema` - stores mongoose collection schemas
- `/src/views` - stores `ejs` rendering files
- `index.js` - initial server startup file