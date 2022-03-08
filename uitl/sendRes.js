module.exports = (res, { data, error = null }, status = 200) => {
  res.status(status).send({
    data,
    error,
  });
};
