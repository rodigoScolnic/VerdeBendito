import db from "../data/models/index.js";
import { Op } from 'sequelize';

const mainController = {
    index: async (req, res) => {
        try {
            const [allUsers, allProducts, allCategories] = await Promise.all([
                db.User.findAll() ,
                db.Product.findAll() ,
                db.Category.findAll()
            ])

            res.render('index', {allCategories} )
        }catch(err){
            res.json(`error: ${err}`)
        }
    },

    products: async (req, res) => {

        const categoryId = req.query.category_id
        const priceMin = req.query.price_min
        const priceMax = req.query.price_max
        const name = req.query.name 

        let where = {}

        if(categoryId) {
            where.category_id = categoryId
        }

        if(priceMin || priceMax){
            where.price = {}

            if (priceMin) {
                where.price[Op.gte] = Number(priceMin);
            }

            if (priceMax) {
                where.price[Op.lte] = Number(priceMax);
            }
        }

        if(name){
             where[Op.or] = [
                { name: { [Op.like]: `%${name}%` } },      // Postgres
                { nickname: { [Op.like]: `%${name}%` } }   // Postgres
            ];
        }

        console.log(where)
        
        try {
            const [ allProducts, allCategories ] = await Promise.all([
                db.Product.findAll({
                    where,
                    include: [{
                        model: db.Category,
                        as: 'category'
                    }]
                }),
                db.Category.findAll()
            ])

            res.render('products', { allProducts, allCategories, filters: {
                categoryId,
                priceMin,
                priceMax,
                name
            } })
        }catch(err){
            res.render(err)
        }

    },

    search: async (req, res) => {
        const { q } = req.query;

        try {
            const results = await db.Product.findAll({
            where: {
                [Op.or]: [
                { nickname: { [Op.like]: `%${q}%` } },
                { name: { [Op.like]: `%${q}%` } }
                ]
            },
            include: [{ association: "category" }],
            limit: 15
            });

            res.json(results);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error en la búsqueda" });
        }

    },

    register: (req,res) => {
        res.render('register');
    },

    login: (req, res) => {
        res.render('login', {
            error: null,
            oldData: {}
        })
    }

}

export default mainController;

