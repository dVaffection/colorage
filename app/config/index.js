function mergeRecursive(source, target) {
    for (var prop in source)
        if (prop in target)
            mergeRecursive(source[prop], target[prop]);
        else
            target[prop] = source[prop];
    return target;
}
;

module.exports = mergeRecursive(require('./global'), require('./local'));
