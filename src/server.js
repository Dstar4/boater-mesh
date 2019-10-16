const express = require('express');
const serverMiddleware = require('./middleware/serverMiddleware');
const router = require('./routes/index');

const server = express();

serverMiddleware(server);
/**
 * @swagger
 * /users:
 *    get:
 *      summary: Returns a list of users.
 *      description: Optional extended description in CommonMark or HTML.
 *      responses:
 *        '200':    # status code
 *          description: A JSON array of user names
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: string
 */
router.use('/', (req, res) => {
  res.status(200).json('API online');
});
server.use('/api', router);

module.exports = server;
