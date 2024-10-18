// Defining text characters for the empty and full hearts
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Hide modal on page load
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden'); // Ensure the modal is hidden initially
});

// Handle the like button click events
const likeButtons = document.querySelectorAll('.like-glyph');
likeButtons.forEach(button => {
  button.addEventListener('click', () => {
    mimicServerCall()
      .then(() => {
        // Toggle between full and empty heart
        if (button.textContent === EMPTY_HEART) {
          button.textContent = FULL_HEART;
          button.classList.add('activated-heart');
        } else {
          button.textContent = EMPTY_HEART;
          button.classList.remove('activated-heart');
        }
      })
      .catch(() => {
        // Show modal on server error
        const modal = document.getElementById('modal');
        modal.classList.remove('hidden');
        document.getElementById('modal-message').textContent = "Random server error. Try again.";

        // Hide modal after 3 seconds
        setTimeout(() => {
          modal.classList.add('hidden');
        }, 3000);
      });
  });
});

// Mock server function (unchanged)
function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
