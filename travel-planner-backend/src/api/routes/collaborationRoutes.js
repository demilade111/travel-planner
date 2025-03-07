const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../../middlewares/auth");
const collaborationController = require("../controllers/collaborationController");
router.post(
  "/trip/:tripId/collaborator",
  [
    auth,
    [
      check("email", "Valid email is required").isEmail(),
      check("role", 'Role must be either "viewer" or "editor"')
        .optional()
        .isIn(["viewer", "editor"]),
    ],
  ],
  collaborationController.addCollaborator
);
router.delete(
  "/trip/:tripId/collaborator/:userId",
  auth,
  collaborationController.removeCollaborator
);
router.put(
  "/trip/:tripId/collaborator/:userId",
  [
    auth,
    [
      check("role", 'Role is required and must be either "viewer" or "editor"')
        .not()
        .isEmpty()
        .isIn(["viewer", "editor"]),
    ],
  ],
  collaborationController.updateCollaboratorRole
);
router.get(
  "/trip/:tripId/collaborators",
  auth,
  collaborationController.getCollaborators
);
router.delete("/trip/:tripId/leave", auth, collaborationController.leaveTrip);
module.exports = router;
