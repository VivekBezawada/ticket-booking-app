exports.verifyConfigData = (data) => {
    const configData = {
        username    :   data.username || '',
        password    :   data.password || ''
    }

    return validateObject(configData);
}

validateObject = (object) => {
    let emptyData = false;
    Object.entries(object).forEach(
        ([key,value]) => {
            if(value == '') {
                console.log(key);
                emptyData = true;
                return;
            }
        }
    );
    if(emptyData) {
        return null;
    }
    return object;
}