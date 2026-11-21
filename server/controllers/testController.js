
const testController = (req,res) => {
    res.status(200).json({
        success: true,
        message: "Hello from TaskFlow controller"
    });
};

module.exports = {testController}