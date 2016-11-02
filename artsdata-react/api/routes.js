const router = require("express").Router()
const taxons = require("../resources/data/taxons.json")

/**
 * TEST
 */
router.get("/test", (req, res) => {
  res.status(200).json({ message: "This is a test" })
})

/**
 * USER DATA
 */

/**
 * OBSERVATION DATA
 */

/**
 * SPECIES DATA
 */
 router.get("/taxons", (req, res) => {
  //TODO: Torjus: Encoding.
   res.status(200).json(taxons)
 })

/**
 * DEFAULT
 */
router.get("/*", (req, res) => {
  res.status(200).json({ message: "Welcome to the artsdata API" })
})

module.exports = router;
