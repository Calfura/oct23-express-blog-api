# oct23-express-blog-api

## Models to make

### Blog

- Title
- Content
- User (posted by)
- Created date
- Likes
- Image upload
- Category
- Audit history
    - user
    - timestap


### Users

- username
- blog post view history

### Comments

Join table in SQL, but a subdocument in Mongoose that lives in Blog posts
- user id
- comment content
- like

### Action Log
- user id
- route vistied
- timestamp
- result
