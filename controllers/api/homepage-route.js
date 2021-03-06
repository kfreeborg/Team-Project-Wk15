const router = require('express').Router();
const { Appointment, Timeblock, User } = require('../../models');

router.get('/', async (req, res) => {
  const { user_id } = req.session;
  try {
    console.log(req.session.user_id);
    let appointments = user_id
      ? await Appointment.findAll({
          where: {
            user_id: req.session.user_id,
          },
          include: [
            {
              model: User,
              attributes: ['username'],
            },
            Timeblock,
          ],
        }).then(appointments =>
          appointments.map(appointment => appointment.get({ plain: true }))
        )
      : null;

    // console.log(appointments)
    const userSomething = await User.findOne({
      where: {
        id: user_id,
      }
    })
    console.log(userSomething.firstname);
    res.render('homepage', {
      appointments,
      loggedIn: true,
      user_id,
      firstname: userSomething.firstname,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
