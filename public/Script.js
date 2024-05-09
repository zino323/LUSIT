// تعريف مصفوفة بالألوان المطلوبة
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

// العثور على العناصر بالمعرفات الذي تم تحديدها
const zinoElement = document.getElementById('zino');
const xElement = document.getElementById('x');
const mohamedElement = document.getElementById('mohamed');

// دالة لتغيير لون النص
function changeTextColor() {
  // اختيار لون عشوائي من المصفوفة
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  // تطبيق اللون على النص
  zinoElement.style.color = randomColor;
  xElement.style.color = 'black'; // لون ثابت للـ 'X'
  mohamedElement.style.color = randomColor;
}

// تغيير لون النص كل ثانية
setInterval(changeTextColor, 1000);
