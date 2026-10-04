import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def generate_pdf():
    pdf_path = os.path.join(os.path.dirname(__file__), "Srikanth_K_V_Resume.pdf")
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=0.5 * inch,
        leftMargin=0.5 * inch,
        topMargin=0.4 * inch,
        bottomMargin=0.4 * inch
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'NameTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=HexColor('#111827'),
        alignment=1, # Center
        spaceAfter=3
    )

    contact_style = ParagraphStyle(
        'ContactLine',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=HexColor('#374151'),
        alignment=1, # Center
        spaceAfter=6
    )

    section_heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=HexColor('#111827'),
        spaceBefore=7,
        spaceAfter=3
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=HexColor('#1f2937'),
        spaceAfter=4
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=HexColor('#1f2937'),
        spaceAfter=2
    )

    item_header_style = ParagraphStyle(
        'ItemHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=HexColor('#111827')
    )

    story = []

    # Name & Contact Header
    story.append(Paragraph("<b>SRIKANTH K V</b>", title_style))
    story.append(Paragraph("Bengaluru, Karnataka &nbsp;|&nbsp; Phone: +91-8197316916 &nbsp;|&nbsp; Email: kanthcomic@gmail.com<br/>GitHub: github.com/Kanth69 &nbsp;|&nbsp; LinkedIn: linkedin.com/in/srikanth-reddy-1a006425a", contact_style))

    # HR line
    story.append(HRFlowable(width="100%", thickness=1, color=HexColor('#111827'), spaceAfter=5, spaceBefore=2))

    # Career Objective
    story.append(Paragraph("CAREER OBJECTIVE", section_heading_style))
    story.append(Paragraph("Software Developer and Data Analyst with hands-on experience in backend development, database management, and data analysis. Skilled in building web applications, developing REST APIs, working with relational databases, and analyzing business data. Seeking a Software Development Engineer role to build scalable applications and contribute to impactful software solutions.", body_style))

    story.append(HRFlowable(width="100%", thickness=0.5, color=HexColor('#d1d5db'), spaceAfter=3, spaceBefore=3))

    # Technical Skills
    story.append(Paragraph("TECHNICAL SKILLS", section_heading_style))
    skills_text = """
    <b>Programming Languages:</b> C++, C, JavaScript (Basics), PHP, Python (Basics)<br/>
    <b>Web Technologies:</b> HTML, CSS, JavaScript, PHP<br/>
    <b>Backend:</b> PHP, Laravel, REST APIs<br/>
    <b>Databases:</b> PostgreSQL, MySQL, SQL<br/>
    <b>Data Analysis:</b> SQL, Tableau, Redash<br/>
    <b>Tools:</b> Git, GitHub, VS Code, XAMPP, MySQL Workbench<br/>
    <b>CS Fundamentals:</b> OOPs, DBMS, Operating Systems, Data Structures & Algorithms
    """
    story.append(Paragraph(skills_text, body_style))

    story.append(HRFlowable(width="100%", thickness=0.5, color=HexColor('#d1d5db'), spaceAfter=3, spaceBefore=3))

    # Experience
    story.append(Paragraph("EXPERIENCE", section_heading_style))
    story.append(Paragraph("<b>Nivasa Finance, Bengaluru</b> &nbsp;&mdash;&nbsp; <i>Software Developer &amp; Data Analyst Intern</i> &nbsp;&nbsp;(May 2026 &ndash; Present)", item_header_style))
    
    bullets_exp = [
        "Worked on backend development using <b>PHP</b> and <b>PostgreSQL</b> for the Navigator Platform.",
        "Contributed to the development and enhancement of the <b>Navigator Platform</b> as part of the software development team.",
        "Worked on REST APIs, backend logic, database operations, and application workflows.",
        "Used <b>PostgreSQL</b> for database querying, data management, and application-level operations.",
        "Performed data analysis and reporting using <b>SQL, Redash, and Tableau</b>.",
        "Worked on CRM workflows, customer processes, dashboards, and business process improvements."
    ]
    for b in bullets_exp:
        story.append(Paragraph(f"&bull;&nbsp; {b}", bullet_style))

    story.append(HRFlowable(width="100%", thickness=0.5, color=HexColor('#d1d5db'), spaceAfter=3, spaceBefore=3))

    # Projects
    story.append(Paragraph("PROJECTS", section_heading_style))

    # ShopCalm
    story.append(Paragraph("<b>ShopCalm &mdash; E-Commerce Platform</b>", item_header_style))
    p1 = [
        "Developed an e-commerce platform with product, category, brand, user, and order management functionalities.",
        "Implemented role-based access control and administrative workflows for product and platform management.",
        "Developed backend functionality using <b>Laravel and PHP with MySQL</b> for database management.",
        "Designed responsive user interfaces using <b>Bootstrap, HTML, CSS, and JavaScript</b>.",
        "<b>Tech Stack:</b> Laravel, PHP, MySQL, Bootstrap, HTML, CSS, JavaScript"
    ]
    for b in p1:
        story.append(Paragraph(f"&bull;&nbsp; {b}", bullet_style))

    story.append(Spacer(1, 3))

    # CineBook
    story.append(Paragraph("<b>CineBook &mdash; Online Movie Ticket Booking System</b>", item_header_style))
    p2 = [
        "Developed a full-stack web application for browsing movies and booking movie tickets.",
        "Implemented user authentication, movie browsing, theatre and showtime management, seat selection, and booking history.",
        "Developed server-side application logic using <b>PHP</b> and managed application data using <b>MySQL</b>.",
        "Built responsive and interactive web pages using <b>HTML, CSS, and JavaScript</b>.",
        "<b>Tech Stack:</b> HTML, CSS, JavaScript, PHP, MySQL"
    ]
    for b in p2:
        story.append(Paragraph(f"&bull;&nbsp; {b}", bullet_style))

    story.append(Spacer(1, 3))

    # College Predictor
    story.append(Paragraph("<b>College Prediction System &mdash; Machine Learning Project</b>", item_header_style))
    p3 = [
        "Developed a machine learning-based web application to predict suitable colleges based on student rank, category, and preferences.",
        "Implemented a <b>Random Forest</b> model using real-world datasets for college prediction.",
        "Performed data preprocessing and analysis using <b>Python, Pandas, and Scikit-learn</b>.",
        "Built a lightweight web interface using <b>Flask, HTML, and CSS</b> for user input and result visualization.",
        "<b>Tech Stack:</b> Python, Flask, Scikit-learn, Pandas, HTML, CSS"
    ]
    for b in p3:
        story.append(Paragraph(f"&bull;&nbsp; {b}", bullet_style))

    story.append(HRFlowable(width="100%", thickness=0.5, color=HexColor('#d1d5db'), spaceAfter=3, spaceBefore=3))

    # Education
    story.append(Paragraph("EDUCATION", section_heading_style))
    story.append(Paragraph("<b>B.Tech in Information Science and Engineering</b> (2022 &ndash; 2026)<br/>University Visvesvaraya College of Engineering (UVCE), Bengaluru &nbsp;|&nbsp; <b>CGPA: 8.6 / 10</b>", body_style))
    story.append(Paragraph("<b>Class 12 (Varadadri PU College)</b> &nbsp;&mdash;&nbsp; 2022 &nbsp;|&nbsp; <b>96.00%</b>", body_style))
    story.append(Paragraph("<b>Class 10 (Adarsha Vidyalaya)</b> &nbsp;&mdash;&nbsp; 2020 &nbsp;|&nbsp; <b>96.64%</b>", body_style))

    story.append(HRFlowable(width="100%", thickness=0.5, color=HexColor('#d1d5db'), spaceAfter=3, spaceBefore=3))

    # Hobbies
    story.append(Paragraph("HOBBIES", section_heading_style))
    story.append(Paragraph("Playing Cricket &nbsp;&bull;&nbsp; Watching Movies", body_style))

    doc.build(story)
    print(f"Successfully generated PDF at {pdf_path}")

if __name__ == "__main__":
    generate_pdf()
