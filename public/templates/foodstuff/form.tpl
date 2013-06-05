<form name="add-foodstuff" id="add-foodstuff-form">
    <input type="hidden" name="id" value="<%= values.id %>" />
    <div class="form-row">
        <div class="input-prepend input-append">
            <span class="add-on">Name</span>
            <input type="text" name="name" placeholder="Name" value="<%= values.name %>" autocomplete="off" autofocus />
        </div>
        <% if (errors.name) { %><ul class="error"><li><%= errors.name %></li></ul><% } %>
    </div>
    <div class="form-row">
        <div class="input-prepend input-append">
            <span class="add-on">Fat</span>
            <input type="text" name="fat" placeholder="Fat" value="<%= values.fat %>" autocomplete="off" />
        </div>
        <% if (errors.fat) { %><ul class="error"><li><%= errors.fat %></li></ul><% } %>
    </div>
    <div class="form-row">
        <div class="input-prepend input-append">
            <span class="add-on">Proteins</span>
            <input type="text" name="protein" placeholder="Proteins" value="<%= values.protein %>" autocomplete="off" />
        </div>
        <% if (errors.protein) { %><ul class="error"><li><%= errors.protein %></li></ul><% } %>
    </div>
    <div class="form-row">
        <div class="input-prepend input-append">
            <span class="add-on">Carbs</span>
            <input type="text" name="carbohydrate" placeholder="Carbohydrates" value="<%= values.carbohydrate %>" autocomplete="off" />
        </div>
        <% if (errors.carbohydrate) { %><ul class="error"><li><%= errors.carbohydrate %></li></ul><% } %>
    </div>
    <div class="form-row">
        <div class="input-prepend input-append">
            <span class="add-on">Per gramm</span>
            <input type="text" name="per_gramm" placeholder="Per gramm" value="<%= values.per_gramm %>" autocomplete="off" />
        </div>
        <% if (errors.per_gramm) { %><ul class="error"><li><%= errors.per_gramm %></li></ul><% } %>
    </div>
    <div class="form-row">
        <button class="btn btn-success" name="submit" type="submit">
            <i class="icon-ok icon-white"></i> Submit
        </button>
        <button class="btn btn-warning" name="reset" type="reset">
            <i class="icon-refresh icon-white"></i> Reset
        </button>
    </div>
</form>