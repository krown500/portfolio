document.addEventListener("DOMContentLoaded", function () {
  // جلب المشاريع
  async function fetchProjects() {
    try {
      const response = await fetch("/api/projects");
      const projects = await response.json();
      displayProjects(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  // عرض المشاريع
  function displayProjects(projects) {
    const projectsGrid = document.querySelector(".projects-grid");
    projectsGrid.innerHTML = projects
      .map(
        (project) => `
    <div class="project-card" data-category="${getProjectCategory(
      project.technologies
    )}">
      <img src="${project.image_url}" alt="${project.title}" />
      <div class="project-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="technologies">
          ${project.technologies
            .split(",")
            .map((tech) => `<span class="tech-tag">${tech.trim()}</span>`)
            .join("")}
        </div>
        <div class="project-links">
          <a href="${
            project.project_url
          }" class="project-btn preview-btn" target="_blank">
            <i class="fas fa-external-link-alt"></i> معاينة
          </a>
        </div>
      </div>
    </div>
  `
      )
      .join("");
  }

  // تحديد فئة المشروع بناءً على التقنيات المستخدمة
  function getProjectCategory(technologies) {
    const techList = technologies.toLowerCase();
    if (techList.includes("api") || techList.includes("rest")) {
      return "api";
    } else if (techList.includes("mysql") || techList.includes("database")) {
      return "database";
    } else {
      return "web";
    }
  }

  // إضافة وظيفة الفلترة
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // إزالة الكلاس active من جميع الأزرار
      filterButtons.forEach((b) => b.classList.remove("active"));
      // إضافة الكلاس active للزر المحدد
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      const projects = document.querySelectorAll(".project-card");

      projects.forEach((project) => {
        if (filter === "all" || project.dataset.category === filter) {
          project.style.display = "block";
        } else {
          project.style.display = "none";
        }
      });
    });
  });

  // استدعاء دالة جلب المشاريع
  fetchProjects();

  // التعامل مع نموذج الاتصال
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("تم إرسال رسالتك بنجاح!");
        contactForm.reset();
      } else {
        alert("حدث خطأ أثناء إرسال الرسالة");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ في الاتصال");
    }
  });
});
