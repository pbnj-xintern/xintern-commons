
module.exports = (body, model) => {
    const modelKeys = model.schema.paths;
    Object.keys(body)
        .forEach(key => {
            if (!(key in modelKeys))
                return false;
        })
    return true;
};