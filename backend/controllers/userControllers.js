import expressAsyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

//@desc Auth user & get Token
//@route POST/api/users/login
//@access PUBLIC - anybody can access it

// const authUser = expressAsyncHandler(async(req, res) => {
//   const users = await User.find({}).lean().exec()
//   // throw new Error ("problem")
//       return res.json({users})
// })

const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // return res.send({email,password})

  const user = await User.findOne({ email: email });
  // console.log(user)

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("invalid email or password");
  }
});

//@desc Register new User
//@route POST/api/users/
//@access PUBLIC

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // return res.send({email,password})

  const userExists = await User.findOne({ email: email });
  // console.log(user)

  if (userExists) {
    res.status(400);
    throw new Error("User already Exits");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//@desc GET user PROFILE
//@route GET/api/users/PROFILE
//@access PRIVATE

const getUserProfile = expressAsyncHandler(async (req, res) => {
  // res.send("Success")

  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      users_id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or Password");
  }
});

//@desc GET all user
//@route GET/api/users
//@access PRIVATE

const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc Delete User
//@route DELETE/api/users/:id
//@access PRIVATE/admin

const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove(); // don't need to return / send anything
    res.json({ message: "User removed successfully" });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//@desc update user PROFILE
//@route PUT/api/users/profile
//@access PRIVATE

// protected hai authorize nahi

const updateUserProfile = expressAsyncHandler(async (req, res) => {
  // res.send("Success")

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name; // automatix=c fillup in frontend
    user.email = req.body.email || user.email;
    if (req.body.password) {
      //isModified added for this only
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or Password");
  }
});



//@desc GET user by Id
//@route GET/api/users/:id
//@access PRIVATE/admin

const getUserById= expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if(user){
    res.json(user)
  }
  else{
    res.status(404);
    throw new Error("User not found");
  }
});





//@desc update user 
//@route PUT/api/users/:id
//@access PRIVATE/Admin/ only admin can do that
//this is protected and authorize 

const updateUser = expressAsyncHandler(async (req, res) => {


  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name; // automatix=c fillup in frontend
    user.email = req.body.email || user.email;
    // if (req.body.password) {
    //   user.password = req.body.password;
    // }   // Admin do not want to change user passwords

    user.isAdmin = req.body.isAdmin


    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      // token: generateToken(updatedUser._id), // no need of token 
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or Password");
  }
});



export { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById , updateUser};
