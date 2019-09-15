module.exports.createErrorResponse = (code, message) => {
  console.error('sendErrorRepsonse: console logging error msg:\n', message)
  return { 
      statusCode: code, 
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: message })
  }
}

module.exports.createSuccessResponse = (code, body) => {
  return {
    statusCode: code,
    headers: { 
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(body)
  }
}