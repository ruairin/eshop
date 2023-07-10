

const handleSignout = (req, res) => {
  req.session.destroy(err => {
    res.status(200).json("logged out");
  })
}

module.exports = {
  handleSignout: handleSignout
}