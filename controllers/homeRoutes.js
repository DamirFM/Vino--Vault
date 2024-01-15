const router = require('express').Router();
const {User, Wine, Review, Category} = require('../models');
const withAuth = require('../utils/auth');

// GET all galleries for homepage
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
    res.render('category', { category });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one painting
router.get('/painting/:id', async (req, res) => {
  try {
    const dbPaintingData = await Painting.findByPk(req.params.id);

    const painting = dbPaintingData.get({ plain: true });
    console.log(painting)
    res.render('painting', { painting });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/about_us', (req, res) => {
  res.render('about_us');
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
    const userData = await Review.findAll( {
      attributes: { exclude: ['password'] },
      include: [{ model: Wine }, {model: User}],
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render('comments', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
