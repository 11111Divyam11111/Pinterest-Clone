var express = require("express");
var router = express.Router();
const postModel = require("./posts");
const userModel = require("./users");
const passport = require("passport");
const upload = require("./multer");

// user login hota hai in 2 lines se
const localStrategy = require("passport-local");
const { redirect } = require("react-router-dom");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/profile", isLoggedIn, async function (req, res, next) {
  try {
    const user = await userModel.findOne({
      username: req.session.passport.user,
    })
    .populate('posts'); // user ke pass posts ki id hai to us id ka use karke wo post hi dikha diya
    res.render("profile", { user});
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

router.get("/feed", isLoggedIn, function(req, res) {
  res.render("feed");
});

router.post("/upload", isLoggedIn,upload.single("file"), async function (req, res,next) {
  if (!req.file) {
    return res.status(400).send("No files were uploaded");
  }
  // jo file upload hui h use save karo as a post and post id user ko do and post ko 
  // user id do
  const user = await userModel.findOne({username:req.session.passport.user});
  const postData = await postModel.create({
    image: req.file.filename,
    imageText : req.body.filecaption,
    user: user._id
  })

  user.posts.push(postData._id);
  await user.save();
  res.redirect("/profile");
  next();
});

router.get("/login", function (req, res) {
  res.render("login", { error: req.flash("error") });
});

router.get('/delpost',async (req,res)=>{

})

router.post("/register", function (req, res) {
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname });

  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res) {}
);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});



router.post("/delete", async function (req, res) {
  try {
    // Check if passport and user properties exist in the session
    if (!req.session.passport || !req.session.passport.user) {
      return res.status(401).send("User not authenticated");
    }

    // Find the user based on the username in the session
    const user = await userModel.findOneAndDelete({
      username: req.session.passport.user,
    });

    if (!user) {
      // Handle the case where the user was not found
      return res.status(404).send("User not found");
    }

    // Redirect to the home page after successful deletion
    res.redirect("/");
  } catch (error) {
    // Handle any errors that occurred during the deletion process
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}
module.exports = router;
