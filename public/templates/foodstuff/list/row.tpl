<tr data-id="<%= item._id%>">
    <td data-name="id">
        <input type="checkbox" name="ids[]" value="<%= item._id%>" />
    </td>
    <td data-name="name"><%= _.escape(item.name) %></td>
    <td data-name="fat"><%= _.escape(item.fat) %></td>
    <td data-name="protein"><%= _.escape(item.protein) %></td>
    <td data-name="carbohydrate"><%= _.escape(item.carbohydrate) %></td>
    <td>
        <button type="button" class="btn" name="edit"><i class="icon-pencil"></i> Edit</button>
    </td>
</tr>