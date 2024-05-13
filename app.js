fetch('data.json')
    .then(response => response.json())
    
   
    .then(data => {
        const studentTableBody = document.getElementById('student-table-body');
       
        const paginationDiv = document.getElementById('pagination');
       
        const pageSize = 10;
        let currentPage = 1;
        let originalData = data.students; // Save original data for reset
        

        const updateTable = (pageData) => {
            
            studentTableBody.innerHTML = ''; 
            if (pageData.length === 0) {
                
                const row = document.createElement('tr');
                row.innerHTML = '<td colspan="4"><span>Data not found</span></td>';
                studentTableBody.appendChild(row);
                
            } else{
            pageData.forEach(student => {
                const row = document.createElement('tr');
               
                row.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.age}</td>
                    <td>${student.class_name}</td>
                    <td>${student.gender}</td>
                `;
                studentTableBody.appendChild(row);
            });
        }
        };

        const updatePagination = (data) => {
            paginationDiv.innerHTML = '';
            const pageCount = Math.ceil(data.length / pageSize);
            if (pageCount > 1) { 
            
            for (let i = 1; i <= pageCount; i++) {
                const pageButton = document.createElement('button');
                pageButton.textContent = i;
                pageButton.addEventListener('click', () => {
                    currentPage = i;
                    const start = (currentPage - 1) * pageSize;
                    const end = start + pageSize;
                    const pageData = data.slice(start, end);
                    updateTable(pageData);
                    updatePagination(data); 
                });
                paginationDiv.appendChild(pageButton);
            }

        }
        }; 
        
        // Initial table rendering
        updateTable(originalData.slice(0, pageSize));
        updatePagination(originalData);

        // Event listener for search input
        document.getElementById('search-value').addEventListener('input', function(event) {
            const searchValue = event.target.value.trim().toLowerCase(); 
            
            const filteredData = originalData.filter(student => 
                student.name.toLowerCase().includes(searchValue) || 
                student.age.toString().includes(searchValue) || 
                student.class_name.toLowerCase().includes(searchValue) || 
                student.gender.toLowerCase().includes(searchValue)
            ); // Filter data based on search value
console.log(filteredData);
            // Update table with filtered data
            updateTable(filteredData.slice(0, pageSize));

            // Update pagination based on filtered data
            updatePagination(filteredData);
        });
        
    }) 
    .catch(error => console.error('Error fetching student data:', error));
    







