import '../../../index.css';
import { init } from '../../main.js';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const content = document.querySelector('#content');
const token = localStorage.getItem('token');

async function renderContent() {
  console.dir(location);
  const id = location.search.split('=')[1];
  const res = await getDogById(id);

  if (res.status === 200) {
    const template = generatorTemplate(res.dog);
    content.innerHTML = template;

    const form = content.querySelector('form');

    bindEvent(form, id);
  }
}

function bindEvent(document, id) {
  document.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.name.value;
    const size = document.size.value;
    const age = document.age.value;

    fetch(`${API_BASE_URL}/dogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        size,
        age,
      }),
    })
      .then(() => {
        location.href = '/dog/';
      })
      .catch((err) => console.err(err));
  });
}

function generatorTemplate(dog) {
  const { _id, userId, name, size, age } = dog;

  let template = `
  <section class="w-2/5">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0"
      >
        <div
          class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
            >
              강아지 정보
            </h1>
            <form id='dog-form' class="space-y-4 md:space-y-6" method='POST'>
 
              <div>  
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >이름</label
                >
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  value="${name}"
                />
              </div>
      
            
              <div>
                <label
                  for="size"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >크기</label
                >
                <select
                  type="text"
                  name="size"
                  id="size"
                  value="${size}"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="username"
                  required
                ><option value='초소형견'>초소형견</option>
                <option value='중형견'>중형견</option>
                <option value='대형견'>대형견</option>
                <option value='초대형견'>초대형견</option></select>

              </div>
              <div>
                <label
                  for="age"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >나이</label
                >
                <input
                  type="number"
                  name="age"
                  id="age"
                  value="${age}"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                class="w-full text-white bg-blue-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                강아지 수정하기
              </button>
        
       
            </form>
          </div>
        </div>
      </div>
    </section>
  `;

  return template;
}

async function getDogById(id) {
  const res = await fetch(`${API_BASE_URL}/dogs/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  return data;
}

document.addEventListener('DOMContentLoaded', () => {
  init();
  renderContent();
});
