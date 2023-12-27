const testController = (req, res) => {
  res.status(200).send({ success: true, msg: 'Welcome to blood bank app' });
};

export default testController;