
// The container for the modal backdrop and the modal itself
const modalContainer = document.querySelector('.modal-container');

// The backdrop that obscures main content
const modalOverlay = document.querySelector('.modal-overlay');

// The modal dialog itself
const modalContent = document.querySelector('.modal-content');

// The root of main content
const mainContent = document.querySelector('.main-content');

function show(event) {
  event?.preventDefault()

  // Hide the main content from assistive technology
  // Mirrors how the main content is visual hidden by the modal backdrop

  // The from `hidden` to `visible`
  modalContainer.style.visibility = 'visible';

  // Expose the modal content to screen readers
  modalContent.setAttribute('aria-hidden', 'false');

  // Setting a role of `alertdialog` will emit an event from the browser to assistive technology to
  // help callout the appearance of a dialog requiring the user's attention
  modalContent.setAttribute('role', 'alertdialog');

  // Focus the first "safe" element within the modal
  modalContent.querySelector('.cancel-button').focus();
}

function hide(event) {
  event?.preventDefault();
  modalContainer.style.visibility = 'hidden';
  mainContent.setAttribute('aria-hidden', 'false');
  modalContent.setAttribute('aria-hidden', 'true');
  modalContent.removeAttribute('role');
  document.querySelector('a.show').focus();
}

document.querySelector('a.show').addEventListener('click', show)
modalOverlay.addEventListener('click', hide);
document.querySelector('.cancel-button').addEventListener('click', hide);

// Escape key should close the dialog
document.addEventListener('keyup', event => {
  if (event.key == 'Escape') {
    hide();
  }
})

// Focus trap - when the modal is visible, prevent focus from going back to the main content area
mainContent.addEventListener('focusin', event => {
  console.log("focus");
  if (modalContainer.style.visibility === 'visible') {
    modalContent.querySelector('.ok-button').focus();
  }
});