import { Request, Response} from 'express';
import connection from '../db/connection';

export const getSuperheroes = (req: Request, res: Response) => {

    try {
        connection.query('SELECT * FROM superhero', (error, data) => {
            if (error) {
                throw error;
            }
            if (!data || data.length === 0) {
                return res.status(404).json({ message: "No superheroes found" });
            }
            res.status(200).json(data);
        });
    } catch (error) {
        console.error("Error retrieving superheroes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getSuperhero = (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: "ID must be an integer" });
        }

        connection.query('SELECT * FROM superhero WHERE id = ?', id, (error, data) => {
            if (error) {
                throw error;
            }
            if (!data || data.length === 0) {
                return res.status(404).json({ message: "Superhero not found" });
            }
            res.status(200).json(data[0]);
        });
    } catch (error) {
        console.error("Error retrieving superhero:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteSuperhero = (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: "ID must be an integer" });
        }

        connection.query('DELETE FROM superhero WHERE id = ?', id, (error, result) => {
            if (error) {
                throw error;
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Superhero not found" });
            }
            res.status(200).json({ message: "Superhero has been successfully deleted" });
        });
    } catch (error) {
        console.error("Error deleting superhero:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const postSuperhero = (req: Request, res: Response) => {
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

        connection.query('INSERT INTO superhero SET ?', body, (error, result) => {
            if (error) {
                throw error;
            }
            res.status(201).json({ id: result.insertId, message: "Superhero has been successfully created" });
        });
    } catch (error) {
        console.error("Error creating superhero:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const putSuperhero = (req: Request, res: Response) => {
    try {
        const { body } = req;
        const { id } = req.params;

        if (!body || Object.keys(body).length === 0) {
            return res.status(400).json({ message: "Request body cannot be empty" });
        }

        connection.query('UPDATE superhero SET ? WHERE id = ?', [body, id], (error, result) => {
            if (error) {
                throw error;
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Superhero not found" });
            }

            res.json({ message: "Superhero has been successfully updated" });
        });
    } catch (error) {
        console.error("Error updating superhero:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
