function mergeRecursive(source, target) {
    for (var prop in source)
        if (prop in target)
            mergeRecursive(source[prop], target[prop]);
        else
            target[prop] = source[prop];
    return target;
}

define([
    'config/global',
    'config/local',
], function(global, local) {
    return mergeRecursive(global, local);
});
