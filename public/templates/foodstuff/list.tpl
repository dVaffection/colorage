<% if (rows.length) { %>

<form method="post" name="manage-foodstuff" id="manage-foodstuff-form">
    <div class="table-buttons clearfix">
        <div class="pull-left">
            <button class="btn btn-danger btn-delete" type="button" name="delete" disabled="">
                <i class="icon-trash icon-white"></i> Delete checked
            </button>
        </div>
        <div class="pull-left filter">
            <input type="search" name="name" value="" placeholder="Filter by name" autocomplete="off" />
        </div>
    </div>

    
    <table class="table table-hover table-striped">
        <thead>
            <tr>
                <th class="id">#</th>
                <th class="name">Name</th>
                <th class="fat">Fat</th>
                <th class="protein">Protein</th>
                <th class="carbohydrates">Carbohydrate</th>
                <th class="actions"></th>
            </tr>
        </thead>
        <tbody>
            <% _.each(rows, function(row) { %>
            <%= row %>
            <% }); %>
        </tbody>
    </table>
</form>

<% } %>
