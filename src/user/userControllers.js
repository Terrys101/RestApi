const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const User = require("./userModel");

exports.addUser = async (req, res) => {
  try {
    
    const newUser = await User.create(req.body);
    const token = await jwt.sign({ _id: newUser._id }, process.env.SECRET);
    res.status(200).send({ user: newUser.username, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.listUsers = async (req, res) => {
  try{
    const users = await User.find({});
    res.status(200).send({allUsers: users});
  } catch (error){
    console.log(error);
    res.status(500).send({err: error.message});
  }
};

exports.login = async (req, res) => {
  try {
    res.status(200).send({ user: req.user.username });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.updatePassword = async (req, res ) =>{
  try{
    const updateUser = await User.updateOne(
      {username: req.user.username},
      {password:req.body }

      );
      if (updateUser.modifiedCount > 0){
        res.status(200).send({msg: "successfully update user"});
      } else {
        throw new Error("Did not update");
      }
  } catch(error){
    console.log(error);
    res.status(500).send({err: error.message});
  }
};

exports.deleteUser = async (req, res) => {
  try{
    const deleteUser = await User.deleteOne({
      [req.params.filterKey]: req.params.filterVal});
    if(deleteUser.deletedCount > 0){
      res.status(200).send({ msg: "user deleted" });
    } else {
      throw new Error("Did not delete");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

    
  

