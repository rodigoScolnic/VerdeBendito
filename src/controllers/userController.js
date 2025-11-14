import User from "../data/models/User.js"
import { Sequelize } from 'sequelize';
import bcrypt from 'bcrypt'


const userController = {
    singin: async (req, res) => {
        
        try {
         const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10)
            })

        res.redirect('/')

        }catch(err) {
            res.send(err)
        }        
    },

    login: async (req, res) => {

        const { email, password} = req.body;
        
        try { 
            
            const user = await User.findOne({where: { email }})

            if( !user ) {
                return res.render('login', {
                    error: 'Email o password incorrect', 
                    oldData: req.body
                })
            }

            const pMatch = await bcrypt.compare(password, user.password)

            if( !pMatch) {
                return res.render('login', {
                    error: 'Email o password incorrect' ,
                    oldData: req.body
                })
            }

            req.session.user = {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role
            }
            
            
             res.redirect('/')




        }catch(err){
            res.json(err)
        }
    },

    logout: async (req, res) => {

        req.session.destroy()
        
        res.redirect('/');

    }
}

export default userController