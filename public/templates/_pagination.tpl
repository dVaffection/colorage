<div class="pagination pagination-centered">
    <ul>
        <% page = 1; while(totalPages >= page) { %>

        <li class="<%= page == currentPage ? 'active' : '' %>">
            <a href="#<%= route%>p<%= page %>"><%= page %></a>
        </li>

        <% page ++; %>
        <% } %>
    </ul>
</div>