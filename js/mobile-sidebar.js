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

  // 기술과 주문 버튼에 이벤트 리스너 추가
  // function addSidebarToggleListeners() {
  //   if (window.innerWidth <= 1400) {  // 모바일 환경에서만 적용
  //     skillButton.addEventListener('click', (e) => {
  //       e.preventDefault();  // 기본 동작 방지
  //       toggleSidebar(rightSidebar);
  //       // 여기에 기술 탭을 활성화하는 로직 추가
  //     });
  //     spellButton.addEventListener('click', (e) => {
  //       e.preventDefault();  // 기본 동작 방지
  //       toggleSidebar(rightSidebar);
  //       // 여기에 주문 탭을 활성화하는 로직 추가
  //     });
  //   }
  // }

  // 초기 설정 및 리사이즈 이벤트에 대한 처리
  //addSidebarToggleListeners();
  //window.addEventListener('resize', addSidebarToggleListeners);

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