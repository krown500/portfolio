CREATE DATABASE IF NOT EXISTS portfolio;
USE portfolio;

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    project_url VARCHAR(255),
    technologies VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- تحديث بيانات المشاريع
TRUNCATE TABLE projects;

INSERT INTO projects (title, description, image_url, project_url, technologies) VALUES 
('منصة تعليمية تفاعلية', 'موقع تعليمي متكامل يقدم الكورسات بنظام المكافآت والتحفيز، يتيح للطلاب كسب النقاط والمكافآت عند إكمال الدروس والاختبارات، مع نظام إدارة متكامل للمحتوى التعليمي والطلاب', 'images/1.png', '/project-preview?id=1', 'PHP,Laravel,MySQL'),
('نظام إدارة طلبات الموردين', 'نظام متكامل لإدارة طلبات التوريد يشمل إدارة الشركات والمجموعات والمنتجات مع تتبع كامل لطلبات التزويد. يتيح النظام إدارة العلاقات بين الشركات والمجموعات والمنتجات وتتبع حالة الطلبات', 'images/2.png', '/project-preview?id=2', 'Node.js,Express,MySQL'),
('Turbo AI CLI', 'أداة سطر أوامر ذكية مفتوحة المصدر تعتمد على نماذج الذكاء الاصطناعي لتسريع وأتمتة المهام البرمجية المختلفة', 'images/3.png', '/project-preview?id=3', 'Node.js,Express,MySQL,OpenAI API');

INSERT INTO projects (title, description, image_url, project_url, technologies) VALUES 
('منصة تعليمية', 'منصة تعليمية تفاعلية مع واجهة برمجة RESTful', '/images/project4.jpg', 'https://project4.example.com', 'Laravel,REST API,MySQL'),
('نظام محاسبي', 'تطوير قاعدة بيانات متكاملة لنظام محاسبي', '/images/project5.jpg', 'https://project5.example.com', 'MySQL,Database,Triggers'); 