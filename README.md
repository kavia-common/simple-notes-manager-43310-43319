# simple-notes-manager-43310-43319

## Notes API Service

This is a minimal Express REST API for managing notes, intended for preview/demo/test use (no login, no advanced querying).

### Running the Service

From inside the `note_api_backend` folder:

```sh
npm install          # install dependencies (first run only)
npm start            # runs on port 3001 (http://localhost:3001)
npm run dev          # run with hot-reload (nodemon)
```

### Endpoints

All endpoints return `application/json` and require/request a JSON body (except GET/DELETE).

| Method | Path            | Description          | Body fields                  |
|--------|-----------------|---------------------|------------------------------|
| GET    | `/notes`        | List all notes      | —                            |
| POST   | `/notes`        | Create a new note   | `{ "title": string, "content"?: string }` |
| GET    | `/notes/:id`    | Get note by id      | —                            |
| PUT    | `/notes/:id`    | Update a note       | `{ "title": string, "content"?: string }` |
| DELETE | `/notes/:id`    | Delete a note       | —                            |

#### Note Model

```json
{
  "id": 2,
  "title": "My Note",
  "content": "Details here",
  "createdAt": "2024-02-12T14:34:00.000Z",
  "updatedAt": "2024-02-12T15:12:01.000Z"
}
```

- `title`: required (non-empty string)
- `content`: optional

### Sample Usage with Curl

**Create a note**
```sh
curl -X POST http://localhost:3001/notes -H "Content-Type: application/json" -d '{"title":"My Note","content":"Something"}'
```

**List notes**
```sh
curl http://localhost:3001/notes
```

**View note with id 1**
```sh
curl http://localhost:3001/notes/1
```

**Update note**
```sh
curl -X PUT http://localhost:3001/notes/1 -H "Content-Type: application/json" -d '{"title":"Updated title","content":"new"}'
```

**Delete note**
```sh
curl -X DELETE http://localhost:3001/notes/1
```

### API Documentation

- OpenAPI/Swagger docs available at [http://localhost:3001/docs](http://localhost:3001/docs)

### Data Persistence

- Notes are stored in memory and written to `notes_api_backend/notes.json` for persistence.
- Editing or deleting `notes.json` will reset the data at the next server restart.

### Error Responses

- All errors return JSON with a clear `message` property and the appropriate HTTP status code.
