"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superhero_controller_1 = require("./superhero.controller");
const connection_1 = __importDefault(require("../db/connection"));
describe('getSuperheroes function', () => {
    let mockRequest;
    let mockResponse;
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should respond with status 200 and superheroes data if query is successful and data is found', () => {
        const mockData = [{ id: 1, name: 'Superman' }, { id: 2, name: 'Batman' }];
        connection_1.default.query = jest.fn().mockImplementationOnce((query, callback) => {
            callback(null, mockData);
        });
        (0, superhero_controller_1.getSuperheroes)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockData);
    });
    it('should respond with status 404 and error message if query is successful but no data is found', () => {
        connection_1.default.query = jest.fn().mockImplementationOnce((query, callback) => {
            callback(null, []);
        });
        (0, superhero_controller_1.getSuperheroes)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'No superheroes found' });
    });
    it('should respond with status 500 and error message if there is an error with the query', () => {
        connection_1.default.query = jest.fn().mockImplementationOnce((query, callback) => {
            callback(new Error('Database error'));
        });
        (0, superhero_controller_1.getSuperheroes)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
});
describe('getSuperhero function', () => {
    let mockRequest;
    let mockResponse;
    beforeEach(() => {
        mockRequest = {
            params: { id: '1' }
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should respond with status 200 and superhero data if query is successful and superhero is found', () => {
        const mockData = [{ id: 1, name: 'Superman' }];
        connection_1.default.query = jest.fn().mockImplementationOnce((query, params, callback) => {
            callback(null, mockData);
        });
        (0, superhero_controller_1.getSuperhero)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockData[0]);
    });
    it('should respond with status 404 and error message if query is successful but superhero is not found', () => {
        connection_1.default.query = jest.fn().mockImplementationOnce((query, params, callback) => {
            callback(null, []);
        });
        (0, superhero_controller_1.getSuperhero)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Superhero not found' });
    });
    it('should respond with status 500 and error message if there is an error with the query', () => {
        connection_1.default.query = jest.fn().mockImplementationOnce((query, params, callback) => {
            callback(new Error('Database error'));
        });
        (0, superhero_controller_1.getSuperhero)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
});
describe('deleteSuperhero function', () => {
    let mockRequest;
    let mockResponse;
    beforeEach(() => {
        mockRequest = {
            params: { id: '1' }
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });
    it('should return status 400 if ID is not an integer', () => {
        mockRequest.params = { id: 'invalid' };
        (0, superhero_controller_1.deleteSuperhero)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: "ID must be an integer" });
    });
    it('should return status 404 if superhero not found', () => {
        mockRequest.params = { id: '999' };
        (0, superhero_controller_1.deleteSuperhero)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: "Superhero not found" });
    });
    it('should delete superhero and return status 200', () => {
        (0, superhero_controller_1.deleteSuperhero)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: "Superhero has been successfully deleted" });
    });
    it('should handle internal server error', () => {
        const errorMessage = "Internal server error";
        jest.spyOn(console, 'error').mockImplementation(() => { }); // Mock console.error
        jest.spyOn(console, 'error').mockReturnValueOnce(undefined); // Reset console.error mock
        jest.spyOn(console, 'error').mockImplementation(() => { throw new Error(errorMessage); }); // Throw error when console.error is called
        (0, superhero_controller_1.deleteSuperhero)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
});
describe('postSuperhero function', () => {
    let mockRequest;
    let mockResponse;
    beforeEach(() => {
        mockRequest = {
            body: { name: 'Test Superhero', age: 30, ability: 'Test Ability', universe: 'Test Universe' }
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });
    it('should return status 400 if request body is empty', () => {
        mockRequest.body = {};
        (0, superhero_controller_1.postSuperhero)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: "Request body cannot be empty" });
    });
    it('should return status 400 if any required field is missing', () => {
        mockRequest.body = { name: 'Test Superhero', age: 30, ability: 'Test Ability' };
        (0, superhero_controller_1.postSuperhero)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: "Missing required field: universe" });
    });
    it('should insert superhero and return status 201', () => {
        (0, superhero_controller_1.postSuperhero)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({ id: expect.any(Number), message: "Superhero has been successfully created" });
    });
    it('should handle internal server error', () => {
        const errorMessage = "Internal server error";
        jest.spyOn(console, 'error').mockImplementation(() => { }); // Mock console.error
        jest.spyOn(console, 'error').mockReturnValueOnce(undefined); // Reset console.error mock
        jest.spyOn(console, 'error').mockImplementation(() => { throw new Error(errorMessage); }); // Throw error when console.error is called
        (0, superhero_controller_1.postSuperhero)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
});
describe('putSuperhero function', () => {
    let mockRequest;
    let mockResponse;
    beforeEach(() => {
        mockRequest = {
            body: { name: 'Updated Superhero', age: 35, ability: 'Updated Ability', universe: 'Updated Universe' },
            params: { id: '1' }
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });
    it('should return status 400 if request body is empty', () => {
        mockRequest.body = {};
        (0, superhero_controller_1.putSuperhero)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: "Request body cannot be empty" });
    });
    it('should update superhero and return status 200', () => {
        (0, superhero_controller_1.putSuperhero)(mockRequest, mockResponse);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: "Superhero has been successfully updated" });
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
    it('should handle internal server error', () => {
        const errorMessage = "Internal server error";
        jest.spyOn(console, 'error').mockImplementation(() => { }); // Mock console.error
        jest.spyOn(console, 'error').mockReturnValueOnce(undefined); // Reset console.error mock
        jest.spyOn(console, 'error').mockImplementation(() => { throw new Error(errorMessage); }); // Throw error when console.error is called
        (0, superhero_controller_1.putSuperhero)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
});
