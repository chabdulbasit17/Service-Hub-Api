

const signUp = (req,res)=>{
    res.send("Test Sign Up");
}

const signIn = (req, res)=>{
    res.send("Test Sign In");
}

module.exports= {
    signUp,
    signIn
}