/* ===== FitTrack Pro JS (Dashboard) =====
   - Keeps the original behavior & layout
   - Persists data in localStorage (key: fittrack_data)
   - Tabs, users, select user, water glasses, meals, workouts
*/

const STORAGE_KEY = 'fittrack_data_v1';

let appData = {
  users: {},       // {id: userObj}
  currentUser: null
};

/* ---------- Utilities ---------- */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const nowISO = () => new Date().toISOString();

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  $('#year').textContent = new Date().getFullYear();
  loadData();
  bindTabs();
  renderDashboard();
  initWaterGrid();
  bindForms();
});

/* ---------- Storage ---------- */
function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
  } catch (e) {
    console.error('save error', e);
  }
}
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) appData = JSON.parse(raw);
  } catch (e) {
    console.error('load error', e);
  }
}

/* ---------- Tabs ---------- */
function bindTabs() {
  document.querySelectorAll('.side-btn').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      document.querySelectorAll('.side-btn').forEach(b=>b.classList.remove('active'));
      ev.currentTarget.classList.add('active');
      const tab = ev.currentTarget.dataset.tab;
      showTab(tab);
    });
  });
}
function showTab(name) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  const el = document.getElementById(name);
  if (!el) return;
  el.classList.add('active');

  // if switching to a tracking tab require user
  if (['water','meals','workout'].includes(name) && !appData.currentUser) {
    alert('Please select a user from the dashboard first!');
    // show dashboard instead
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById('dashboard').classList.add('active');
    // set active button
    document.querySelectorAll('.side-btn').forEach(b=>b.classList.remove('active'));
    document.querySelector('.side-btn[data-tab="dashboard"]').classList.add('active');
    return;
  }

  if (name === 'water') initWaterGrid();
  if (name === 'meals') displayMeals();
  if (name === 'workout') displayWorkouts();
}

/* ---------- Profiles & Dashboard ---------- */
function renderDashboard() {
  const grid = $('#usersGrid');
  const users = Object.values(appData.users);
  if (users.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;color:white;padding:60px;">
        <h3 style="font-size:1.4rem;margin-bottom:12px;">No Users Yet</h3>
        <p style="opacity:.8;margin-bottom:18px;">Create your first profile to start tracking!</p>
        <button class="btn primary" id="quickCreate">➕ Create Profile</button>
      </div>`;
    $('#quickCreate')?.addEventListener('click', ()=> {
      document.querySelector('.side-btn[data-tab="profile"]').click();
    });
    return;
  }

  grid.innerHTML = users.map(u => {
    const initial = u.name ? u.name.charAt(0).toUpperCase() : 'U';
    const workoutCount = (u.workouts || []).length;
    const mealCount = (u.meals || []).length;
    const waterCount = u.water || 0;
    return `
      <div class="user-card" data-id="${u.id}">
        <div class="user-avatar">${initial}</div>
        <div class="user-info">
          <div class="user-name">${escapeHtml(u.name)}</div>
          <p style="opacity:.85;margin:6px 0;">${u.age} years • ${u.gender}</p>
          <p style="opacity:.85">${u.weight}kg → ${u.targetWeight}kg</p>
          <div class="user-stats">
            <div><div class="user-stat-value">${workoutCount}</div><div class="user-stat-label">Workouts</div></div>
            <div><div class="user-stat-value">${mealCount}</div><div class="user-stat-label">Meals</div></div>
            <div><div class="user-stat-value">${waterCount}</div><div class="user-stat-label">Water</div></div>
          </div>
        </div>
      </div>`;
  }).join('');

  // attach clicks
  document.querySelectorAll('.user-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      selectUser(id);
    });
  });
}

function selectUser(userId) {
  appData.currentUser = userId;
  saveData();
  const user = appData.users[userId];
  alert(`Selected: ${user.name}\n\nNow you can track water, meals, and workouts for this user!`);
  // switch to water tab
  document.querySelector('.side-btn[data-tab="water"]').click();
}

/* ---------- Profile form ---------- */
function bindForms() {
  $('#profileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    saveProfile();
  });

  $('#clearProfiles').addEventListener('click', () => {
    if (!confirm('Delete all profiles? This cannot be undone.')) return;
    appData = { users: {}, currentUser: null };
    saveData();
    renderDashboard();
    alert('All profiles cleared.');
  });

  $('#mealForm').addEventListener('submit', (e)=> { e.preventDefault(); addMeal(); });
  $('#workoutForm').addEventListener('submit', (e)=> { e.preventDefault(); addWorkout(); });

  $('#resetWater').addEventListener('click', () => {
    if (!appData.currentUser) return;
    appData.users[appData.currentUser].water = 0;
    saveData(); initWaterGrid();
  });
  $('#saveWater').addEventListener('click', () => {
    showSuccess('waterSuccess');
    saveData();
  });
}

function saveProfile() {
  const id = Date.now().toString();
  const profile = {
    id,
    name: $('#name').value.trim(),
    age: $('#age').value.trim(),
    gender: $('#gender').value,
    height: $('#height').value,
    weight: $('#weight').value,
    targetWeight: $('#targetWeight').value,
    fitnessGoal: $('#fitnessGoal').value,
    activityLevel: $('#activityLevel').value,
    createdAt: nowISO(),
    water: 0,
    meals: [],
    workouts: []
  };

  if (!profile.name || !profile.age || !profile.height || !profile.weight) {
    alert('Please fill required fields.');
    return;
  }

  appData.users[id] = profile;
  saveData();
  calculateBMI(profile);
  showSuccess('profileSuccess');
  document.getElementById('profileForm').reset();

  // refresh dashboard after short delay to show success
  setTimeout(()=> { renderDashboard(); document.querySelector('.side-btn[data-tab="dashboard"]').click(); }, 900);
}

function calculateBMI(profile) {
  const heightM = parseFloat(profile.height) / 100;
  const weight = parseFloat(profile.weight);
  if (!heightM || !weight) return;
  const bmi = (weight / (heightM * heightM));
  const bmiFixed = Math.round(bmi * 10) / 10;
  let category = '', color = '';
  if (bmi < 18.5) { category='Underweight'; color='linear-gradient(135deg,#74b9ff,#a29bfe)'; }
  else if (bmi < 25) { category='Normal'; color='linear-gradient(135deg,#00b894,#55efc4)'; }
  else if (bmi < 30) { category='Overweight'; color='linear-gradient(135deg,#fdcb6e,#e17055)'; }
  else { category='Obese'; color='linear-gradient(135deg,#ff7675,#d63031)'; }

  $('#bmiDisplay').innerHTML = `
    <div class="stat-card" style="background:${color};margin-top:18px;border-radius:12px;padding:14px;color:#fff;">
      <div class="stat-value">${bmiFixed}</div>
      <div class="stat-label">BMI - ${category}</div>
    </div>`;
}

/* ---------- Water Tracker ---------- */
function initWaterGrid() {
  const grid = $('#waterGrid');
  grid.innerHTML = '';
  const waterCount = appData.currentUser ? (appData.users[appData.currentUser].water || 0) : 0;
  for (let i=0;i<8;i++){
    const glass = document.createElement('div');
    glass.className = 'water-glass';
    if (i < waterCount) glass.classList.add('filled');
    glass.addEventListener('click', ()=> toggleWater(i));
    grid.appendChild(glass);
  }
  updateWaterProgress();
}

function toggleWater(index) {
  if (!appData.currentUser) return;
  const user = appData.users[appData.currentUser];
  if (index === user.water) user.water++;
  else if (index === user.water - 1) user.water--;
  else user.water = index + 1;
  if (user.water > 8) user.water = 8;
  if (user.water < 0) user.water = 0;
  saveData();
  initWaterGrid();
}

function updateWaterProgress() {
  const waterCount = appData.currentUser ? (appData.users[appData.currentUser].water || 0) : 0;
  const progress = Math.round((waterCount / 8) * 100);
  $('#waterProgress').style.width = progress + '%';
  $('#waterProgress').textContent = progress + '%';
}

/* ---------- Meals ---------- */
function addMeal() {
  if (!appData.currentUser) return;
  const meal = {
    id: Date.now().toString(),
    type: $('#mealType').value,
    name: $('#mealName').value.trim(),
    calories: parseInt($('#mealCalories').value) || 0,
    protein: parseInt($('#mealProtein').value) || 0,
    date: nowISO()
  };
  if (!meal.name) return alert('Please add meal name');
  appData.users[appData.currentUser].meals.push(meal);
  saveData();
  $('#mealForm').reset();
  displayMeals();
}

function deleteMeal(mealId) {
  if (!appData.currentUser) return;
  const user = appData.users[appData.currentUser];
  user.meals = user.meals.filter(m => m.id !== mealId);
  saveData(); displayMeals();
}

function displayMeals() {
  if (!appData.currentUser) return;
  const user = appData.users[appData.currentUser];
  const today = new Date().toDateString();
  const todayMeals = (user.meals || []).filter(m => new Date(m.date).toDateString() === today);

  const totalCal = todayMeals.reduce((s,m)=> s + (m.calories||0), 0);
  const totalPro = todayMeals.reduce((s,m)=> s + (m.protein||0), 0);
  $('#totalCalories').textContent = totalCal;
  $('#totalProtein').textContent = totalPro;

  const container = $('#mealsList');
  if (todayMeals.length === 0) {
    container.innerHTML = '<p style="color:rgba(255,255,255,0.6);text-align:center;padding:24px">No meals logged today</p>';
    return;
  }

  container.innerHTML = todayMeals.map(meal => `
    <div class="item-card">
      <button class="delete-btn" onclick="deleteMeal('${meal.id}')">🗑️</button>
      <h4>${getMealEmoji(meal.type)} ${meal.type.toUpperCase()}</h4>
      <p><strong>${escapeHtml(meal.name)}</strong></p>
      <p>🔥 ${meal.calories} kcal | 💪 ${meal.protein}g protein</p>
      <p style="opacity:.7;font-size:.9rem">${new Date(meal.date).toLocaleTimeString()}</p>
    </div>`).join('');
}

/* ---------- Workouts ---------- */
function addWorkout() {
  if (!appData.currentUser) return;
  const workout = {
    id: Date.now().toString(),
    name: $('#exerciseName').value.trim(),
    type: $('#exerciseType').value,
    duration: parseInt($('#duration').value) || 0,
    calories: parseInt($('#caloriesBurned').value) || 0,
    sets: $('#sets').value,
    reps: $('#reps').value,
    notes: $('#workoutNotes').value.trim(),
    date: nowISO()
  };
  if (!workout.name) return alert('Enter exercise name');
  appData.users[appData.currentUser].workouts.push(workout);
  saveData();
  $('#workoutForm').reset();
  displayWorkouts();
}

function deleteWorkout(id) {
  if (!appData.currentUser) return;
  const user = appData.users[appData.currentUser];
  user.workouts = user.workouts.filter(w => w.id !== id);
  saveData(); displayWorkouts();
}

function displayWorkouts() {
  if (!appData.currentUser) return;
  const user = appData.users[appData.currentUser];
  const today = new Date().toDateString();
  const todayWorkouts = (user.workouts || []).filter(w => new Date(w.date).toDateString() === today);

  const totalWorkouts = (user.workouts || []).length;
  const totalBurned = (user.workouts || []).reduce((s,w)=> s + (w.calories||0), 0);
  $('#totalWorkouts').textContent = totalWorkouts;
  $('#totalCaloriesBurned').textContent = totalBurned;

  const container = $('#workoutsList');
  if (todayWorkouts.length === 0) {
    container.innerHTML = '<p style="color:rgba(255,255,255,0.6);text-align:center;padding:24px">No workouts logged today</p>';
    return;
  }

  container.innerHTML = todayWorkouts.map(w => `
    <div class="item-card">
      <button class="delete-btn" onclick="deleteWorkout('${w.id}')">🗑️</button>
      <h4>${getWorkoutEmoji(w.type)} ${escapeHtml(w.name)}</h4>
      <p><strong>${w.type}</strong></p>
      <p>⏱️ ${w.duration} min | 🔥 ${w.calories} kcal</p>
      ${w.sets ? `<p>💪 ${w.sets} sets × ${w.reps} reps</p>` : ''}
      ${w.notes ? `<p style="opacity:.8">📝 ${escapeHtml(w.notes)}</p>` : ''}
      <p style="opacity:.7;font-size:.9rem">${new Date(w.date).toLocaleTimeString()}</p>
    </div>`).join('');
}

/* ---------- Small helpers & emojis ---------- */
function getMealEmoji(type){
  const map = { breakfast:'🌅', lunch:'☀️', dinner:'🌙', snack:'🍿' };
  return map[type] || '🍽️';
}
function getWorkoutEmoji(type){
  const map = { cardio:'🏃', strength:'💪', flexibility:'🧘', sports:'⚽' };
  return map[type] || '🏋️';
}
function showSuccess(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.style.display = 'block';
  setTimeout(()=> el.style.display = 'none', 2000);
}
function escapeHtml(s){ if(!s) return ''; return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

/* Expose some functions to global scope for inline onclicks inside generated HTML */
window.deleteMeal = deleteMeal;
window.deleteWorkout = deleteWorkout;
window.selectUser = selectUser;
