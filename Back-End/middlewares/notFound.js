function notFound(req, res) {
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    console.log(`${fullUrl} doesn't exist`);
    return res.status(404).json({ message: `${fullUrl} doesn't exist` });
}

module.exports = notFound;
