|Request    |URL                                 |Params      |Body                                 |Description                                                           |
|-----------|------------------------------------|------------|-------------------------------------|----------------------------------------------------------------------|
|GET        |localhost:8080                      |/           |/                                    |Basic endpoint. Get all entities.                                     |
|GET        |localhost:8080/getAll               |/           |/                                    |Same previous endpoint.                                               |
|GET        |localhost:8080/get/1                |/           |/                                    |Get single available entity based on @PathVarialbe("document_id")     |
|GET        |localhost:8080/get?document_id=1    |document_id |/                                    |Get single available entity based on @RequestParam String document_id |
|DELETE     |localhost:8080/delete?document_id=1 |document_id |/                                    |Delete single entity based on http body.                              |
|POST       |localhost:8080/create               |/           |name, lastname, profession, imageUrl |Create entity based on http body.                                     |
|PUT        |localhost:8080/update?document_id=1 |document_id |name, lastname, profession, imageUrl |Update entity based on http body and url parameters.                  |
|PUT        |localhost:8080/update/1             |/           |name, lastname, profession, imageUrl |Update entity based on http body.                                     |