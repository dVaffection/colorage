module.exports = function (mongoose) {

    this.getOrCreateModel = function(name, schema) {
        var model;

        try {
            // Throws an error if "Name" hasn't been registered
            model = mongoose.model(name);
        } catch (error) {
            model = mongoose.model(name, schema);
        }

        return model;
    };
}
