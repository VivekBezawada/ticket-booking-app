let statuses = {
    200 : "Success",
    404 : "Not Found",
    500 : "Error"
}

exports.getResponse = (status,message,result,res) => {
    return res.status(status).json({status :statuses[status] || '',message : message || '',result : result || []});
}
