import { User } from '../models/User.js';
import * as bcrypt from 'bcrypt';
// import * as jwt from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'secretkey123456';  //cambiar!!

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        
        if (!user) return req.status(404).json({messagge: 'user not valid'});

        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            
            const expiresIn = 6 * 60 * 60;
            const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
            
            return res.json({ token, user });
        } else {
            return res.status(500).json({ message: 'credenciales not valid' });
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


export const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
           

        const exist = await User.findOne({ where: { email: email } });

        if (exist) {
            return res.status(500).json({ message: 'email already used' });
        } else {
            let pass = bcrypt.hashSync(password, bcrypt.genSaltSync(10)); 

            const newUser = await User.create({
                email,
                password: pass,
                firstName,
                lastName
            });
                  
            await newUser.save();

            const expiresIn = 6 * 60 * 60;
            const token = jwt.sign({ id: newUser.id }, SECRET_KEY, { expiresIn: expiresIn });
            
            return res.json({ token, newUser });

        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getAll = async (req, res) => {
    try {
    
        const users = await User.findAll();

        if (!users) {
            return res.status(500).json({ message: 'not users' });
        } else {
            return res.json({ users });

        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}
