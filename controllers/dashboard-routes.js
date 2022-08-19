const router = require('express').Router();
const { INTEGER } = require('sequelize');
const sequelize = require('../config/connection');
const { Product, Category } = require('../models');

// get all posts for homepage
router.get('/:id', (req, res) => {
  console.log('======================home all');
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'desired_price',
          'product_note',
          'quantity',
          'category_id',
          'image_name',
        ],
      },
    ],
  })
    .then((dbCategoryData) => {
      const post = dbCategoryData.map((post) => post.get({ plain: true }));

      //const post = res.json(dbCategoryData);
      // console.log(post);
      let cat = [];
      let posts = [];
      let match = 0;
      for (let i = 0; i < post.length; i++) {
        if (parseInt(post[i].id) === parseInt(req.params.id)) {
          match = i;
          cat.push({
            id: post[i].id,
            category_name: post[i].category_name,
          });
          posts = post[i].products;
        }
      }
      for (let i = 0; i < posts.length; i++) {
        posts[i].category_name = post[match].category_name;
      }

      console.log(cat);
      let cats = JSON.stringify(cat);
      console.log(cats);
      res.render('dashboard', {
        posts,
        cats,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
