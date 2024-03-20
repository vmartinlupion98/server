import { Router } from "express";
import { deleteSuperhero, getSuperhero, getSuperheroes, postSuperhero, putSuperhero } from "../controllers/superhero.controller";

const router = Router();

router.get('/',getSuperheroes);
router.get('/:id',getSuperhero);
router.delete('/:id',deleteSuperhero);
router.post('/',postSuperhero);
router.put('/:id',putSuperhero);

export default router;