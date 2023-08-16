function main() {
    let inputText = document.querySelector('#text');
    let root = document.querySelector('ul');
    let all = document.querySelector('.all');
    let active = document.querySelector('.active');
    let completed = document.querySelector('.completed');
    let clear = document.querySelector('.clear');
  
    let activeButton = 'all';
  
    let allTodos = localStorage.getItem('allTodos')
      ? JSON.parse(localStorage.getItem('allTodos'))
      : [];
  
    function handleInput(event) {
      if (event.keyCode === 13 && event.target.value !== '') {
        let todo = {
          name: event.target.value,
          isDone: false,
        };
        allTodos.push(todo);
        event.target.value = '';
        createUI();
        localStorage.setItem('allTodos', JSON.stringify(allTodos));
      }
    }
  
    function handleToggle(event) {
      let id = event.target.dataset.id;
      allTodos[id].isDone = !allTodos[id].isDone;
      createUI();
      localStorage.setItem('allTodos', JSON.stringify(allTodos));
    }
  
    function handleDelete(event) {
      let id = event.target.dataset.id;
      allTodos.splice(id, 1);
      createUI();
      localStorage.setItem('allTodos', JSON.stringify(allTodos));
    }
  
    function createUI(data = allTodos) {
      root.innerHTML = '';
      data.forEach((todo, i) => {
        let li = document.createElement('li');
        li.classList.add('flex');
        let input = document.createElement('input');
        input.type = 'checkbox';
        input.setAttribute('data-id', i);
        input.addEventListener('input', handleToggle);
        input.checked = todo.isDone;
        let p = document.createElement('p');
        p.innerText = todo.name;
        let span = document.createElement('span');
        span.innerText = '❌';
        span.setAttribute('data-id', i);
        span.addEventListener('click', handleDelete);
  
        li.append(input, p, span);
        root.append(li);
      });
    }
  
  createUI();
  
    all.addEventListener('click', () => {
      createUI();
      activeButton = 'all';
      updateActiveButton();
    });
  
    active.addEventListener('click', () => {
      let remaining = allTodos.filter((todo) => !todo.isDone);
      createUI(remaining);
      activeButton = 'active';
      updateActiveButton();
    });
  
    completed.addEventListener('click', () => {
      let complete = allTodos.filter((todo) => todo.isDone);
      createUI(complete);
      activeButton = 'completed';
      updateActiveButton();
    });
  
    clear.addEventListener('click', () => {
      allTodos = allTodos.filter((todo) => !todo.isDone);
      createUI();
      localStorage.setItem('allTodos', JSON.stringify(allTodos));
    });
  
    function updateActiveButton(btn = activeButton) {
      all.classList.remove('selected');
      active.classList.remove('selected');
      completed.classList.remove('selected');
  
      if (btn === 'all') {
        all.classList.add('selected');
      }
      if (btn === 'active') {
        active.classList.add('selected');
      }
      if (btn === 'completed') {
        completed.classList.add('selected');
      }
    }
  
    updateActiveButton();
  
    inputText.addEventListener('keyup', handleInput);
  }
  
  main();