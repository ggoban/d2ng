// mobile-sidebar.js

document.addEventListener('DOMContentLoaded', function() {
  const leftSidebar = document.getElementById('left-sidebar');
  const rightSidebar = document.getElementById('right-sidebar');
  const toggleLeftBtn = document.getElementById('toggle-left-sidebar');
  const toggleRightBtn = document.getElementById('toggle-right-sidebar');
  //const skillButton = document.getElementById('skillButton');
  //const spellButton = document.getElementById('spellButton');

  function toggleSidebar(sidebar) {
    sidebar.classList.toggle('active');
    if (sidebar === rightSidebar) {
      leftSidebar.classList.remove('active');
    } else {
      rightSidebar.classList.remove('active');
    }
  }

  toggleLeftBtn.addEventListener('click', () => toggleSidebar(leftSidebar));
  toggleRightBtn.addEventListener('click', () => toggleSidebar(rightSidebar));

  // 사이드바 외부 클릭 시 닫기
  document.addEventListener('click', function(event) {
    if (!leftSidebar.contains(event.target) && !toggleLeftBtn.contains(event.target)) {
      leftSidebar.classList.remove('active');
    }
    if (!rightSidebar.contains(event.target) && !toggleRightBtn.contains(event.target)) {
      rightSidebar.classList.remove('active');
    }
  });
});