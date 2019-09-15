module.exports.createErrorResponse = (code, message) => {
    console.error('sendErrorRepsonse: console logging error msg:\n', errorMessage)
    return { 
        statusCode: statusCode, 
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: errorMessage })
    }
}

module.exports.sendSuccessResponse = (code, body) => {
    return {
      statusCode: code,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(body)
    }
  }