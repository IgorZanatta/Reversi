function openPopup(popupId) {
  document.getElementById(popupId).style.display = 'block';
  document.querySelector('.overlay').style.display = 'block';
}

function closePopup(popupId) {
  document.getElementById(popupId).style.display = 'none';
  document.querySelector('.overlay').style.display = 'none';
}