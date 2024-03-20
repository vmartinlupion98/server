"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putSuperhero = exports.postSuperhero = exports.deleteSuperhero = exports.getSuperhero = exports.getSuperheroes = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getSuperheroes = (req, res) => {
    try {
        connection_1.default.query('SELECT * FROM superhero', (error, data) => {
            if (error) {
                throw error;
            }
            if (!data || data.length === 0) {
                return res.status(404).json({ message: "No superheroes found" });
            }
            res.status(200).json(data);
        });
    }
    catch (error) {
        console.error("Error retrieving superheroes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getSuperheroes = getSuperheroes;
const getSuperhero = (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: "ID must be an integer" });
        }
        connection_1.default.query('SELECT * FROM superhero WHERE id = ?', id, (error, data) => {
            if (error) {
                throw error;
            }
            if (!data || data.length === 0) {
                return res.status(404).json({ message: "Superhero not found" });
            }
            res.status(200).json(data[0]);
        });
    }
    catch (error) {
        console.error("Error retrieving superhero:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getSuperhero = getSuperhero;
const deleteSuperhero = (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: "ID must be an integer" });
        }
        connection_1.default.query('DELETE FROM superhero WHERE id = ?', id, (error, result) => {
            if (error) {
                throw error;
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Superhero not found" });
            }
            res.status(200).json({ message: "Superhero has been successfully deleted" });
        });
    }
    catch (error) {
        console.error("Error deleting superhero:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteSuperhero = deleteSuperhero;
const postSuperhero = (req, res) => {
    try {
        const { body } = req;
        if (!body || Object.keys(body).length === 0) {
            return res.status(400).json({ message: "Request body cannot be empty" });
        }
        const requiredFields = ['name', 'age', 'ability', 'universe'];
        for (const field of requiredFields) {
            if (!body[field]) {
                return res.status(400).json({ message: `Missing required field: ${field}` });
            }
        }
        connection_1.default.query('INSERT INTO superhero SET ?', body, (error, result) => {
            if (error) {
                throw error;
            }
            res.status(201).json({ id: result.insertId, message: "Superhero has been successfully created" });
        });
    }
    catch (error) {
        console.error("Error creating superhero:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.postSuperhero = postSuperhero;
const putSuperhero = (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        // Validar que el cuerpo de la solicitud no esté vacío
        if (!body || Object.keys(body).length === 0) {
            return res.status(400).json({ message: "Request body cannot be empty" });
        }
        connection_1.default.query('UPDATE superhero SET ? WHERE id = ?', [body, id], (error, result) => {
            if (error) {
                throw error;
            }
            // Validar si el superhéroe fue actualizado correctamente
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Superhero not found" });
            }
            res.json({ message: "Superhero has been successfully updated" });
        });
    }
    catch (error) {
        console.error("Error updating superhero:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.putSuperhero = putSuperhero;
