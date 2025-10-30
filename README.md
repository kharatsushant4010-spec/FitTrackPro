<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>FitTrack Pro - Dashboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <style>
/* --- Base & Fonts --- */
:root{
    --primary: #6C5CE7;
    --accent: #FD79A8;
    --success: #00B894;
    --warning: #FDCB6E;
    --danger: #FF7675;
    --glass: rgba(255,255,255,0.08);
    --white-90: rgba(255,255,255,0.92);
    --muted: rgba(255,255,255,0.75);
}
*{box-sizing:border-box;margin:0;padding:0}
html,body,#root{height:100%}
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #e6edf3;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

/* Improved backdrop with darker overlay */
body::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 20% 20%, rgba(108, 92, 231, 0.15), transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(253, 121, 168, 0.12), transparent 50%),
              rgba(20, 15, 40, 0.45);
  z-index: 0;
  backdrop-filter: blur(2px);
}

/* Keep the content above the animation */
header, main, footer {
  position: relative;
  z-index: 1;
}

/* App layout */
.app{display:flex;gap:28px;max-width:1400px;margin:30px auto;padding:20px;align-items:flex-start;position:relative;z-index:1}
.sidebar{
    width:260px;background:var(--glass);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
    border-radius:20px;padding:22px;border:1px solid rgba(255,255,255,0.12);box-shadow:0 10px 30px rgba(0,0,0,0.25)
}
.brand{display:flex;gap:12px;align-items:center;margin-bottom:18px}
.logo-glow{width:56px;height:56px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.6rem;
    background:linear-gradient(135deg,var(--accent),var(--primary));box-shadow:0 8px 30px rgba(108,92,231,0.25);border:2px solid rgba(255,255,255,0.12)}
.brand-info h3{font-size:1.1rem;margin-bottom:2px}
.brand-info p{font-size:0.8rem;color:rgba(255,255,255,0.8)}

.side-nav{display:flex;flex-direction:column;gap:10px}
.side-btn{
    background:transparent;border:none;color:var(--white-90);padding:12px 14px;border-radius:12px;text-align:left;font-weight:600;
    cursor:pointer;transition:all .25s cubic-bezier(.2,.9,.2,1);font-size:0.98rem;
}
.side-btn:hover{transform:translateX(6px);opacity:0.95}
.side-btn.active{background:linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85));color:var(--primary);box-shadow:0 8px 30px rgba(0,0,0,0.25)}

.sidebar-foot{margin-top:18px;text-align:center;color:rgba(255,255,255,0.6);font-size:0.82rem}

/* Main area */
.main{flex:1}
.main-header{background:rgba(20,15,40,0.4);padding:26px;border-radius:20px;border:1px solid rgba(255,255,255,0.15);margin-bottom:20px;box-shadow:0 12px 40px rgba(0,0,0,0.28);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.main-header h1{font-size:2rem;letter-spacing:1px;margin-bottom:8px;background:linear-gradient(135deg,#fff,#ffeaa7);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.main-header p{color:rgba(255,255,255,0.95)}

/* Tabs */
.tab{display:none}
.tab.active{display:block}

/* Glass card */
.glass-card{
    background: linear-gradient(135deg, rgba(20,15,40,0.35), rgba(20,15,40,0.25));
    border-radius:18px;padding:28px;border:1px solid rgba(255,255,255,0.12);
    box-shadow: 0 12px 40px rgba(0,0,0,0.35);
    animation: slideUp .6s cubic-bezier(.2,.9,.2,1);
    backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)
}
@keyframes slideUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}

/* grids */
.users-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:20px;margin-top:18px}
.user-card{background:linear-gradient(135deg, rgba(108,92,231,0.15), rgba(253,121,168,0.08));border-radius:14px;padding:20px;border:2px solid rgba(255,255,255,0.12);cursor:pointer;transition:all .35s;position:relative;overflow:hidden;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.user-card:hover{transform:translateY(-10px);box-shadow:0 20px 50px rgba(0,0,0,0.45);border-color:rgba(255,255,255,0.18)}
.user-avatar{width:90px;height:90px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--primary));display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:2.4rem;color:white;border:4px solid rgba(255,255,255,0.9)}
.user-info{text-align:center}
.user-name{font-size:1.1rem;font-weight:700;margin-bottom:6px}
.user-stats{display:flex;justify-content:space-around;margin-top:14px;gap:10px}
.user-stat-value{font-weight:700;color:var(--warning);font-size:1.1rem}

/* forms */
.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px}
.form-grid-2{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}
.form-group{display:flex;flex-direction:column;gap:8px}
.form-group label{font-size:0.78rem;color:rgba(255,255,255,0.95);font-weight:600}
.form-group input,.form-group select,.form-group textarea{padding:12px 14px;border-radius:12px;border:2px solid rgba(255,255,255,0.12);background:rgba(20,15,40,0.25);color:var(--white-90);outline:none;transition:all .18s;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{transform:translateY(-3px);box-shadow:0 8px 24px rgba(108,92,231,0.2);border-color:rgba(255,255,255,0.25)}
.form-group.full{grid-column:1/-1}

/* buttons */
.btn{padding:12px 20px;border-radius:999px;border:none;cursor:pointer;font-weight:800;letter-spacing:0.6px;transition:all .25s}
.btn.primary{background:linear-gradient(135deg,#fff,#f5f5f5);color:var(--primary);box-shadow:0 8px 30px rgba(255,255,255,0.06)}
.btn.secondary{background:linear-gradient(135deg,var(--accent),var(--danger));color:white}
.btn.ghost{background:transparent;border:2px solid rgba(255,255,255,0.12);color:var(--white-90)}

/* small helpers */
.muted{color:rgba(255,255,255,0.85);margin-bottom:12px}
.row.actions{display:flex;gap:12px}

/* progress & water */
.water-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:12px;margin-top:18px}
.water-glass{aspect-ratio:3/4;border-radius:10px;border:3px solid rgba(255,255,255,0.18);background:rgba(20,15,40,0.2);cursor:pointer;position:relative;overflow:hidden;transition:all .32s}
.water-glass::before{content:"";position:absolute;left:0;bottom:0;width:100%;height:0;background:linear-gradient(180deg,#4facfe,#00f2fe);transition:height .45s cubic-bezier(.2,.9,.2,1)}
.water-glass.filled::before{height:100%}
.water-glass:hover{transform:scale(1.06) rotate(2deg);border-color:rgba(255,255,255,0.28)}

.progress-container{background:rgba(20,15,40,0.25);border-radius:999px;height:44px;overflow:hidden;border:2px solid rgba(255,255,255,0.12);margin-top:18px;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
.progress-bar{height:100%;display:flex;align-items:center;justify-content:center;font-weight:700;background:linear-gradient(90deg,var(--success),var(--warning),var(--accent));width:0%;transition:width .6s;box-shadow:inset 0 6px 20px rgba(0,0,0,0.25);color:#fff}

/* stats */
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;margin-top:18px}
.stat-card{background:linear-gradient(135deg, rgba(108,92,231,0.12), rgba(253,121,168,0.08));padding:18px;border-radius:12px;border:1px solid rgba(255,255,255,0.12);text-align:center;position:relative;overflow:hidden;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.stat-value{font-size:2rem;font-weight:800}
.stat-label{color:rgba(255,255,255,0.9);font-weight:700;letter-spacing:0.6px}

/* items */
.item-list{margin-top:16px;display:grid;gap:12px}
.item-card{background:rgba(20,15,40,0.3);padding:14px;border-radius:12px;border-left:6px solid var(--accent);position:relative;overflow:hidden;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
.item-card h4{margin-bottom:6px}
.delete-btn{position:absolute;right:14px;top:14px;background:var(--danger);color:white;border:none;padding:6px 10px;border-radius:10px;cursor:pointer}

/* success */
.success-msg{display:none;margin-top:14px;padding:12px;border-radius:10px;background:linear-gradient(135deg,var(--success),#55efc4);color:#052; font-weight:700;}

/* tiny responsive */
@media (max-width: 980px){
    .app{flex-direction:column;padding:12px}
    .sidebar{width:100%;display:flex;justify-content:space-between;align-items:center}
    .side-nav{flex-direction:row;gap:6px;overflow:auto;padding-top:8px}
    .main-header{padding:18px}
    .users-grid{grid-template-columns:repeat(auto-fill,minmax(200px,1fr))}
}
@keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
    </style>
</head>
<body>
    <div class="app">
        <!-- SIDEBAR -->
        <aside class="sidebar">
            <div class="brand">
                <div class="logo-glow">💪</div>
                <div class="brand-info">
                    <h3>FitTrack Pro</h3>
                    <p>Premium Gym Tracker</p>
                </div>
            </div>

            <nav class="side-nav">
                <button class="side-btn active" data-tab="dashboard">🏠 Dashboard</button>
                <button class="side-btn" data-tab="profile">👤 Add Profile</button>
                <button class="side-btn" data-tab="water">💧 Water</button>
                <button class="side-btn" data-tab="meals">🍽️ Meals</button>
                <button class="side-btn" data-tab="workout">🏋️ Workouts</button>
            </nav>

            <div class="sidebar-foot">
                <small>© <span id="year"></span> FitTrack Pro</small>
            </div>
        </aside>

        <!-- MAIN -->
        <main class="main">
            <header class="main-header">
                <h1>💪 FitTrack Pro</h1>
                <p>Your Premium Gym & Wellness Companion</p>
            </header>

            <section id="dashboard" class="tab active">
                <div class="glass-card">
                    <h2>👥 All Users</h2>
                    <div id="usersGrid" class="users-grid"></div>
                </div>
            </section>

            <section id="profile" class="tab">
                <div class="glass-card">
                    <h2>📋 Create New Profile</h2>
                    <form id="profileForm" class="profile-form">
                        <div class="form-grid">
                            <div class="form-group"><label>Full Name</label><input id="name" required placeholder="Enter your name" /></div>
                            <div class="form-group"><label>Age</label><input id="age" type="number" required placeholder="Your age" /></div>
                            <div class="form-group"><label>Gender</label>
                                <select id="gender" required>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div class="form-group"><label>Height (cm)</label><input id="height" type="number" required placeholder="Height" /></div>
                            <div class="form-group"><label>Current Weight (kg)</label><input id="weight" step="0.1" type="number" required placeholder="Current weight" /></div>
                            <div class="form-group"><label>Target Weight (kg)</label><input id="targetWeight" step="0.1" type="number" required placeholder="Goal weight" /></div>
                            <div class="form-group"><label>Fitness Goal</label>
                                <select id="fitnessGoal" required>
                                    <option value="">Select Goal</option>
                                    <option value="weight_loss">Weight Loss</option>
                                    <option value="muscle_gain">Muscle Gain</option>
                                    <option value="maintenance">Maintenance</option>
                                    <option value="endurance">Endurance</option>
                                </select>
                            </div>
                            <div class="form-group"><label>Activity Level</label>
                                <select id="activityLevel" required>
                                    <option value="">Select Level</option>
                                    <option value="sedentary">Sedentary</option>
                                    <option value="light">Lightly Active</option>
                                    <option value="moderate">Moderately Active</option>
                                    <option value="very">Very Active</option>
                                    <option value="extra">Extra Active</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-actions">
                            <button type="submit" class="btn primary">💾 Save Profile</button>
                            <button type="button" id="clearProfiles" class="btn ghost">🗑️ Clear All</button>
                        </div>
                    </form>

                    <div id="profileSuccess" class="success-msg">✅ Profile created successfully!</div>
                    <div id="bmiDisplay"></div>
                </div>
            </section>

            <section id="water" class="tab">
                <div class="glass-card">
                    <h2>💧 Water Intake Tracker</h2>
                    <p class="muted">Daily Goal: 8 glasses (2 liters) | Click glasses to track</p>
                    <div id="waterGrid" class="water-grid"></div>

                    <div class="progress-container">
                        <div id="waterProgress" class="progress-bar" style="width:0%">0%</div>
                    </div>

                    <div class="row actions" style="margin-top:18px;">
                        <button class="btn" id="resetWater">🔄 Reset</button>
                        <button class="btn secondary" id="saveWater">💾 Save Data</button>
                    </div>
                    <div id="waterSuccess" class="success-msg">✅ Water data saved!</div>
                </div>
            </section>

            <section id="meals" class="tab">
                <div class="glass-card">
                    <h2>🍽️ Meal Tracking</h2>
                    <form id="mealForm" class="form-inline">
                        <div class="form-grid-2">
                            <div class="form-group"><label>Meal Type</label>
                                <select id="mealType">
                                    <option value="breakfast">🌅 Breakfast</option>
                                    <option value="lunch">☀️ Lunch</option>
                                    <option value="dinner">🌙 Dinner</option>
                                    <option value="snack">🍿 Snack</option>
                                </select>
                            </div>
                            <div class="form-group"><label>Meal Name</label><input id="mealName" required placeholder="What did you eat?" /></div>
                            <div class="form-group"><label>Calories (kcal)</label><input id="mealCalories" type="number" required placeholder="Calories" /></div>
                            <div class="form-group"><label>Protein (g)</label><input id="mealProtein" type="number" required placeholder="Protein grams" /></div>
                        </div>

                        <div class="form-actions"><button class="btn primary" type="submit">➕ Add Meal</button></div>
                    </form>

                    <div class="stats-grid">
                        <div class="stat-card"><div id="totalCalories" class="stat-value">0</div><div class="stat-label">Calories Today</div></div>
                        <div class="stat-card"><div id="totalProtein" class="stat-value">0</div><div class="stat-label">Protein (g)</div></div>
                    </div>

                    <div id="mealsList" class="item-list"></div>
                </div>
            </section>

            <section id="workout" class="tab">
                <div class="glass-card">
                    <h2>🏋️ Workout Logger</h2>
                    <form id="workoutForm" class="form-inline">
                        <div class="form-grid-2">
                            <div class="form-group"><label>Exercise Name</label><input id="exerciseName" required placeholder="e.g., Bench Press" /></div>
                            <div class="form-group"><label>Type</label>
                                <select id="exerciseType">
                                    <option value="cardio">🏃 Cardio</option>
                                    <option value="strength">💪 Strength</option>
                                    <option value="flexibility">🧘 Flexibility</option>
                                    <option value="sports">⚽ Sports</option>
                                </select>
                            </div>
                            <div class="form-group"><label>Duration (min)</label><input id="duration" type="number" required placeholder="Minutes" /></div>
                            <div class="form-group"><label>Calories Burned</label><input id="caloriesBurned" type="number" required placeholder="Estimated calories" /></div>
                            <div class="form-group"><label>Sets</label><input id="sets" type="number" placeholder="Number of sets" /></div>
                            <div class="form-group"><label>Reps</label><input id="reps" type="number" placeholder="Reps per set" /></div>
                        </div>

                        <div class="form-group full"><label>Notes</label><textarea id="workoutNotes" rows="3" placeholder="Any notes..."></textarea></div>
                        <div class="form-actions"><button class="btn primary" type="submit">💪 Log Workout</button></div>
                    </form>

                    <div class="stats-grid">
                        <div class="stat-card"><div id="totalWorkouts" class="stat-value">0</div><div class="stat-label">Total Workouts</div></div>
                        <div class="stat-card"><div id="totalCaloriesBurned" class="stat-value">0</div><div class="stat-label">Calories Burned</div></div>
                    </div>

                    <div id="workoutsList" class="item-list"></div>
                </div>
            </section>

        </main>
    </div>

    <script>
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
    </script>
</body>
</html>
