$(document).ready(function() {
    var users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Aaron Miles', email: 'aaron@mailinator.com' },
    { id: 3, name: 'Aishwarya Naik', email: 'aishwarya@mailinator.com' },
    { id: 4, name: 'Arvind Kumar', email: 'arvind@mailinator.com' },
    { id: 5, name: 'Caterina Binotto', email: 'caterina@mailinator.com' },
    { id: 6, name: 'Chetan Kumar', email: 'chetan@mailinator.com' },
    { id: 7, name: 'Jim McClain', email: 'jim@mailinator.com' },
    { id: 8, name: 'Mahaveer Singh', email: 'mahaveer@mailinator.com' },
    { id: 9, name: 'Rahul Jain', email: 'rahul@mailinator.com' },
    { id: 10, name: 'Rizan Khan', email: 'rizan@mailinator.com' },
    { id: 11, name: 'Sarah Potter', email: 'sarah@mailinator.com' },
    { id: 12, name: 'Keshav Muddaiah', email: 'keshav@mailinator.com' },
    { id: 13, name: 'Nita Ramesh', email: 'nita@mailinator.com' },
    { id: 14, name: 'Julia Hunstman', email: 'julia@mailinator.com' },
    { id: 15, name: 'Juan Alonso', email: 'juan@mailinator.com' },
    { id: 16, name: 'Gabriel Montoya', email: 'gabriel@mailinator.com' },
    { id: 17, name: 'Beatrice Iglesias', email: 'beatrice@mailinator.com' },
    { id: 18, name: 'Sarah Symms', email: 'sarah.s@mailinator.com' },
    { id: 19, name: 'Patrick Pinheiro', email: 'patrick@mailinator.com' },
    { id: 20, name: 'Anand Patel', email: 'anand@mailinator.com' },
    { id: 21, name: 'Kishore Kalburgi', email: 'kishore@mailinator.com' },
    { id: 22, name: 'Rebecca Norris', email: 'rebecca@mailinator.com' },
    { id: 23, name: 'Özgür Başak', email: 'ozgur@mailinator.com' },
    { id: 24, name: 'Robin Andersen', email: 'robin@mailinator.com' },
    { id: 25, name: 'Nandini Kumar', email: 'nandini@mailinator.com' },
    { id: 26, name: 'Nikita Smith', email: 'nikita@mailinator.com' },
    { id: 27, name: 'Colton Doe', email: 'colton@mailinator.com' },
    { id: 28, name: 'Alain Senna', email: 'alain@mailinator.com' },
    { id: 29, name: 'Ashwin Jain', email: 'ashwin@mailinator.com' },
    { id: 30, name: 'Seema Bhatt', email: 'seema@mailinator.com' },
    { id: 31, name: 'Kayla Scarpinski', email: 'kayla@mailinator.com' },
    { id: 32, name: 'Ajay Ghosh', email: 'ajay@mailinator.com' },
    { id: 33, name: 'Chris Lindberg', email: 'chris@mailinator.com' },
    { id: 34, name: 'Christina Mourujärvi', email: 'christina@mailinator.com' },
    { id: 35, name: 'Mikhail Bill', email: 'mikhail@mailinator.com' },
    { id: 36, name: 'Eino Göregen', email: 'eino@mailinator.com' },
    { id: 37, name: 'Zachariah Johansson', email: 'zacharaiah@mailinator.com' },
    { id: 38, name: 'Aimaan Mohammed', email: 'aimaan@mailinator.com' },
    { id: 39, name: 'Aika Tsunoda', email: 'aika@mailinator.com' },
    { id: 40, name: 'Kimiko Minamoto', email: 'kimiko@mailinator.com' }
    ];
    
    var page = 0;
    var pageSize = 10;

    function updateTable(start, end) {
      var currentPageUsers = users.slice(start, end);
      var tbody = document.getElementById('tableBody');
      tbody.innerHTML = '';
      currentPageUsers.forEach(function(user) {
        var tr = document.createElement('tr');
        tr.innerHTML = '<td>' + user.id + '</td><td>' + user.name + '</td><td>' + user.email + '</td><td><button class="btn btn-danger delete-user" data-id="' + user.id + '">Delete</button><button class="btn btn-primary ml-2 edit-user" data-id="' + user.id + '">Edit</button></td>';
        tbody.appendChild(tr);
      });

      $('.edit-user').on('click', function() {
        var id = $(this).data('id');
        var newName = prompt('Enter new name');
        var newEmail = prompt('Enter new email');
        
        var userIndex = users.findIndex(u => u.id === id);
        if (userIndex !== -1) {
          users[userIndex].name = newName || users[userIndex].name;
          users[userIndex].email = newEmail || users[userIndex].email;
          updateTable(page * pageSize, (page + 1) * pageSize);
          updatePagination();
        }
      });

      $('.delete-user').on('click', function() {
        var id = $(this).data('id');
        users = users.filter(u => u.id !== id);
        updateTable(page * pageSize, (page + 1) * pageSize);
        updatePagination();
      });
    }

    function updatePagination() {
      var totalPages = Math.ceil(users.length / pageSize);
      var paginationDiv = document.getElementById('pagination');
      paginationDiv.innerHTML = '';
      for (var i = 0; i < totalPages; i++) {
        var btn = document.createElement('button');
        btn.classList.add('btn', 'btn-primary');
        btn.setAttribute('data-page', i);
        btn.innerHTML = i + 1;
        if (i === page) {
          btn.classList.add('active');
        }
        btn.addEventListener('click', function() {
          var currentPage = $(this).data('page');
          if (currentPage !== page) {
            page = currentPage;
            updateTable(page * pageSize, (page + 1) * pageSize);
            updatePagination();
          }
        });
        paginationDiv.appendChild(btn);
      }
    }

    $('#searchButton').click(function() {
      var searchTerm = $('#searchInput').val().toLowerCase();
      var filteredUsers = users.filter(function(user) {
        return user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm);
      });
      users = filteredUsers;
      page = 0;
      updateTable(page * pageSize, (page + 1) * pageSize);
      updatePagination();
    });

    $('#addNewUser').click(function() {
        var newName = prompt('Enter name');
        var newEmail = prompt('Enter email');
        var newUserEmail = prompt('Enter user email');
        
        var newUser = {
          id: users.length + 1,
          name: newName || 'New User',
          email: newEmail || 'newuser@mail.com',
          user_email: newUserEmail || 'useremail@example.com' // Add a new user email property
        };
        
        users.push(newUser);
        updateTable(page * pageSize, (page + 1) * pageSize);
        updatePagination();
      });
      

    updateTable(page * pageSize, (page + 1) * pageSize);
    updatePagination();
  });