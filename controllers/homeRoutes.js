const router = require('express').Router();
const { User, Wine, Review, Category } = require('../models');
const withAuth = require('../utils/auth');
const fs = require('fs');
const readline = require('readline');


router.get('/', async (req, res) => {
  try {
    const dbCategoryData = await Category.findAll({
      include: [
        {
          model: Wine,
          attributes: ['filename', 'title', 'varietal', 'location', 'price', 'rating'],
        },
      ],
    });
    // Serialize data so the template can read it
    const categories = dbCategoryData.map((category) => category.get({ plain: true }));
    console.log(categories)
    res.render('homepage', {
      categories,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Review }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/top_wines', async (req, res) => {
  console.log('topwines')
  try {
    // Check if the database is empty
    const count = await Wine.count();

    // if (count < 10) {
    //   // Seed the database with the JSONL file data
    //   console.log('8888888')
    //   let wines = [];
    //   const rl = readline.createInterface({
    //     input: fs.createReadStream('./assets/wine_documents.jsonl'),
    //     output: process.stdout,
    //     terminal: false
    //   });

    //   rl.on('line', (line) => {
    //     wines.push(JSON.parse(line));
    //   });

    //   rl.on('close', async () => {
    //     await Wine.bulkCreate(wines)
    //       .then(() => {
    //         console.log('Wines have been seeded successfully!');
    //       })
    //       .catch((err) => {
    //         console.log('Error seeding wines:', err);
    //       });

    //     // Sort the wines by rating in descending order
    //     const sortedWines = wines.sort((a, b) => b.rating - a.rating);
    //     console.log(sortedWines, '--------------')
    //     res.render('top_wines', {
    //       sortedWines, logged_in: req.session.logged_in,
    //     });
    //   });
    // } else {
      console.log('++++++')
      // Fetch all wines from the database
      const dbWineData = await Wine.findAll({});

      // Map the raw database data to plain JavaScript objects
      const wines = dbWineData.map((wine) =>
        wine.get({ plain: true })
      );

      // Sort the wines by rating in descending order
      const sortedWines = wines.sort((a, b) => b.rating - a.rating);
      console.log(sortedWines, '=============')
      res.render('top_wines', {
        sortedWines, logged_in: req.session.logged_in
      });
    // }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/category/:id', async (req, res) => {
  try {
    const dbCategoryData = await Wine.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ['category_name'],
        },
        {
          model: Review,
        }
      ],
    });

    const category = dbCategoryData.get({ plain: true });
    console.log(category)
    res.render('category', { ...category, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/offers', async (req, res) => {
  console.log('offers')
  try {
    // Check if the database is empty
    const count = await Wine.count();

    if (count < 10) {
      // Seed the database with the JSONL file data
      console.log('999999')
      let wines = [];
      const rl = readline.createInterface({
        input: fs.createReadStream('./assets/wine_documents.jsonl'),
        output: process.stdout,
        terminal: false
      });

      rl.on('line', (line) => {
        wines.push(JSON.parse(line));
      });

      rl.on('close', async () => {
        await Wine.bulkCreate(wines)
          .then(() => {
            console.log('Wines have been seeded successfully!');
          })
          .catch((err) => {
            console.log('Error seeding wines:', err);
          });

        // Sort the wines by rating in descending order
        const sortedWines = wines.sort((a, b) => b.price - a.price);
        console.log(sortedWines, 'BOO')
        res.render('offers', {
          sortedWines, logged_in: req.session.logged_in,
        });
      });
    } else {
      console.log('YAH')
      // Fetch all wines from the database
      const dbWineData = await Wine.findAll({});

      // Map the raw database data to plain JavaScript objects
      const wines = dbWineData.map((wine) =>
        wine.get({ plain: true })
      );

      // Sort the wines by rating in descending order
      const sortedWines = wines.sort((a, b) => b.rating - a.rating);
      console.log(sortedWines, 'KAH')
      res.render('offers', {
        sortedWines, logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/about_us', (req, res) => {
  res.render('about_us', {
    logged_in: req.session.logged_in
  })
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/review', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await Review.findAll({
      attributes: { exclude: ['password'] },
      include: [{ model: Wine }, { model: User }],
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render('comments', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
