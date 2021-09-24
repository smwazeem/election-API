const express = require("express");
const client = require("./databasepg");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const app = express();
app.use(bodyParser.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
    },
  },
  apis: ["app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(5000, () => console.log("listening on 5000"));

client.connect();

/**
 * @swagger
 * /api/vote:
 *  post:
 *   summary: cast a vote
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *        type: object
 *        properties:
 *          name:
 *           type: string
 *           description: name of the candidate
 *   responses:
 *    200:
 *     description: vote was casted succesfully
 *    404:
 *     description: Not found
 *    500:
 *     description: failure in casting vote
 */

app.post("/api/vote", (req, res) => {
  const candidate = req.body;

  let getNameQuery = `select distinct(name) from candidates`;

  client.query(getNameQuery, (err, result) => {
    var participatedCandidate = result.rows.some(
      (c) => c.name === candidate.name
    );
    if (!participatedCandidate) {
      res.status(404).send("The requested candidate is not participated");
    }
  });

  let insertQuery = `UPDATE candidates SET votes = votes + 1 Where name='${candidate.name}'`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.status(200).send(`successfully voted to ${candidate.name}`);
    } else {
      res.status(500).send(err.message);
    }
  });
  client.end;
});

/**
 * @swagger
 * /api/candidate/{id}/count:
 *   get:
 *     summary: count the votes
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *         type: string
 *         required: true
 *         description: candidate's id to count vote
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 *
 */

app.get("/api/candidate/:id/count", (req, res) => {
  let getIdQuery = `select id from candidates`;

  client.query(getIdQuery, (err, result) => {
    var candidateId = result.rows.some((c) => c.id === req.params.id);
    if (!candidateId) {
      res.status(404).send("The requested candidate's id is not found");
    }
  });

  client.query(
    `select * from candidates where id=${req.params.id}`,
    (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send(err.message);
      }
    }
  );
  client.end;
});
