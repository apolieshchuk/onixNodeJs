const { getChartData } = require('./service');
async function chart(req, res, next) {
    try {
        return res.status(200).json({
            data: await getChartData(),
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.name,
            details: error.message,
        });
        return next(error);
    }
}
module.exports = {
    chart,
};
