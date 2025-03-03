// Function to show update form
function showUpdateForm() {
  var updateForm = document.getElementById('updateForm');
  updateForm.style.display = 'block';
}

// Function to hide update form
function hideUpdateForm() {
  var updateForm = document.getElementById('updateForm');
  updateForm.style.display = 'none';
}

// Example event listener to toggle update form visibility
var updateButton = document.querySelector('.button'); // Assuming the button is used to trigger the update form
updateButton.addEventListener('click', function() {
  showUpdateForm();
});
