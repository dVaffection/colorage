<ul class="nav">

    <% _.each(navigation, function(item) { %>
    <li class="<%= item.active ? 'active' : '' %>">
        <a href="#<%= item.hash %>"><%= item.label %></a>
    </li>
    <% }); %>

</ul>