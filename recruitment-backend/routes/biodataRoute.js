import express from "express";
import BiodataService from "../service/biodataService.js";

let router = express.Router();

router.get("/", async (req, res) => {
    const biodata = await BiodataService.getBiodata(req.role, req.id);
    return res.status(biodata.statusCode).json(biodata);
});

router.get("/:id", async (req, res) => {
    const biodata = await BiodataService.getBiodataById(
        req.params.id,
        req.id,
        req.role
    );
    return res.status(biodata.statusCode).json(biodata);
});

router.post("/", async (req, res) => {
    const payload = { ...req.body };
    payload.id = req.id;
    const biodata = await BiodataService.createBiodata(payload);
    return res.status(biodata.statusCode).json(biodata);
});

router.put("/:id", async (req, res) => {
    const payload = { ...req.body };
    const biodata = await BiodataService.updateBiodata(
        req.params.id,
        payload,
        req.id,
        req.role
    );
    return res.status(biodata.statusCode).json(biodata);
});

router.delete("/:id", async (req, res) => {
    const biodata = await BiodataService.deleteById(
        req.params.id,
        req.id,
        req.role
    );
    return res.status(biodata.statusCode).json(biodata);
});

export default router;
