"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
// MongoDB connection URI
const DB_URL = 'mongodb+srv://sahil2:Aa123456@cluster0.rfxzntu.mongodb.net/';
let db = null;
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new mongodb_1.MongoClient(DB_URL);
        try {
            yield client.connect();
            console.log('Connected to MongoDB');
            db = client.db('lms');
        }
        catch (error) {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1);
        }
    });
}
app.get('/', (_req, res) => {
    return res.send('Express TypeScript on Vercel');
});
app.get('/ping', (_req, res) => {
    return res.send('pong 🏓');
});
app.get('/user', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (db) {
            const users = yield db.collection('users').find().toArray();
            return res.json(users);
        }
        else {
            throw new Error('Database connection is not established');
        }
    }
    catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).send('Internal Server Error');
    }
}));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectToDatabase();
        console.log(`Server is listening on ${port}`);
    }
    catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
}));
//# sourceMappingURL=index.js.map