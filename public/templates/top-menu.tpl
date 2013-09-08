<div class="navbar navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container">

            <ul class="nav">

                <% _.each(navigation, function(item) { %>
                <li class="<%= item.active ? 'active' : '' %>">
                    <a href="#<%= item.hash %>"><%= item.label %></a>
                </li>
                <% }); %>

                <li><a href="/login/">Login</a></li>
            </ul>

        </div>
    </div>
</div>
