/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (properties, array) => {
    if (!properties instanceof Array || !array instanceof Array) {
        throw 'input is in a wrong format';
    }
    return array.map(item => {
        let clonedItem = Object.assign({}, item);
        for (let property of properties) {
            delete clonedItem[property];
        }
        return clonedItem;
    });
};
exports.excludeByProperty = (deletedProperty, array) => {
    if (!deletedProperty instanceof String || !array instanceof Array) {
        throw 'input is in a wrong format';
    }
    return array.map(item => Object.assign({}, item))
        .filter(item => !(deletedProperty in item));
};
exports.sumDeep = (array) => {
    return array.map(item => {
        return { objects: item.objects.map(item => item.val).reduce((accumulator, current) => accumulator + current) };
    });
};
exports.applyStatusColor = (colors, array) => {
    //We need to check input types like  functions above
    let results = [];
    let colorsObjects = {};
    for (let key in colors) { //We restructure the colors object here 
        for (let code of colors[key]) {
            colorsObjects[code] = key;
        }
    }
    for (let item of array) {
        results.push(Object.assign({ color: colorsObjects[item.status] }, item));
    }
    return results.filter(item => item.color);
};
exports.createGreeting = (fn, greeting) => {
    if (!fn instanceof Function || !greeting instanceof String) {
        throw 'input is in a wrong format';
    }
    return (name) => fn(greeting, name);
};
exports.setDefaults = (defaults) => {
    if (!defaults instanceof Object) {
        throw 'input is in a wrong format';
    }
    return (input) => {
        return Object.assign({}, defaults, input);
    };
};
exports.fetchUserByNameAndUsersCompany = (name, services) => {
    return new Promise(resolve => {
        let status;
        //I did not use Promise.all because we know that fetchUsers result comes back sooner than fetchStatus  and we need the users list to call fetchCompanies as soon as possible 
        services.fetchStatus().then(result => {
            status = result;
        });
        services.fetchUsers().then(users => {
            let user = users.find(item => item.name === name);
            services.fetchCompanyById(user.companyId).then(company => {
                resolve({
                    user, company, status
                });
            });

        });
    });
};
