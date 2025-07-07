// Global state
let experienceCount = 0;
let educationCount = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updatePreview();
    updateProgress();
});

// Setup event listeners
function setupEventListeners() {
    // Personal info fields
    const personalFields = ['firstName', 'lastName', 'email', 'phone', 'location', 'summary'];
    personalFields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            element.addEventListener('input', () => {
                updatePreview();
                updateProgress();
            });
        }
    });

    // Skills field
    const skillsField = document.getElementById('skills');
    if (skillsField) {
        skillsField.addEventListener('input', () => {
            updatePreview();
            updateProgress();
        });
    }

    // Add experience button
    document.getElementById('addExperience').addEventListener('click', addExperience);
    
    // Add education button
    document.getElementById('addEducation').addEventListener('click', addEducation);
}

// Add new experience entry
function addExperience() {
    experienceCount++;
    const container = document.getElementById('experienceContainer');
    const noExperience = document.getElementById('noExperience');
    
    if (noExperience) {
        noExperience.style.display = 'none';
    }

    const experienceHTML = `
        <div class="border border-gray-200 rounded-lg p-4 space-y-4 mb-4" id="experience-${experienceCount}">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent experience-input" placeholder="Senior Software Engineer" data-field="title" data-index="${experienceCount}">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent experience-input" placeholder="TechCorp Inc." data-field="company" data-index="${experienceCount}">
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent experience-input" data-field="startDate" data-index="${experienceCount}">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent experience-input" data-field="endDate" data-index="${experienceCount}">
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent experience-input" placeholder="Describe your responsibilities and achievements..." data-field="description" data-index="${experienceCount}"></textarea>
            </div>
            <div class="flex justify-end">
                <button class="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors" onclick="removeExperience(${experienceCount})">
                    Remove
                </button>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', experienceHTML);

    // Add event listeners to new fields
    const newInputs = container.querySelectorAll(`[data-index="${experienceCount}"]`);
    newInputs.forEach(input => {
        input.addEventListener('input', () => {
            updatePreview();
            updateProgress();
        });
    });

    updatePreview();
    updateProgress();
}

// Remove experience entry
function removeExperience(index) {
    const element = document.getElementById(`experience-${index}`);
    if (element) {
        element.remove();
    }

    // Show "no experience" message if no entries left
    const container = document.getElementById('experienceContainer');
    const experiences = container.querySelectorAll('[id^="experience-"]');
    if (experiences.length === 0) {
        document.getElementById('noExperience').style.display = 'block';
    }

    updatePreview();
    updateProgress();
}

// Add new education entry
function addEducation() {
    educationCount++;
    const container = document.getElementById('educationContainer');
    const noEducation = document.getElementById('noEducation');
    
    if (noEducation) {
        noEducation.style.display = 'none';
    }

    const educationHTML = `
        <div class="border border-gray-200 rounded-lg p-4 space-y-4 mb-4" id="education-${educationCount}">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Degree *</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent education-input" placeholder="Bachelor of Science" data-field="degree" data-index="${educationCount}">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Field of Study *</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent education-input" placeholder="Computer Science" data-field="field" data-index="${educationCount}">
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">School *</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent education-input" placeholder="Stanford University" data-field="school" data-index="${educationCount}">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">GPA</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent education-input" placeholder="3.8" data-field="gpa" data-index="${educationCount}">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                    <input type="number" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent education-input" placeholder="2019" data-field="year" data-index="${educationCount}">
                </div>
            </div>
            <div class="flex justify-end">
                <button class="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors" onclick="removeEducation(${educationCount})">
                    Remove
                </button>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', educationHTML);

    // Add event listeners to new fields
    const newInputs = container.querySelectorAll(`[data-index="${educationCount}"]`);
    newInputs.forEach(input => {
        input.addEventListener('input', () => {
            updatePreview();
            updateProgress();
        });
    });

    updatePreview();
    updateProgress();
}

// Remove education entry
function removeEducation(index) {
    const element = document.getElementById(`education-${index}`);
    if (element) {
        element.remove();
    }

    // Show "no education" message if no entries left
    const container = document.getElementById('educationContainer');
    const educations = container.querySelectorAll('[id^="education-"]');
    if (educations.length === 0) {
        document.getElementById('noEducation').style.display = 'block';
    }

    updatePreview();
    updateProgress();
}

// Update resume preview
function updatePreview() {
    const data = collectFormData();
    const preview = document.getElementById('resumePreview');
    
    let html = '';

    // Header Section
    const fullName = `${data.personalInfo.firstName} ${data.personalInfo.lastName}`.trim();
    if (fullName.length > 1) {
        html += `
            <div class="text-center mb-6 pb-4 border-b-2 border-gray-200">
                <h1 class="text-2xl font-bold text-gray-900 mb-2">${fullName}</h1>
                <div class="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600">
                    ${data.personalInfo.email ? `<span>${data.personalInfo.email}</span>` : ''}
                    ${data.personalInfo.phone ? `<span>${data.personalInfo.phone}</span>` : ''}
                    ${data.personalInfo.location ? `<span>${data.personalInfo.location}</span>` : ''}
                </div>
            </div>
        `;
    }

    // Professional Summary
    if (data.personalInfo.summary) {
        html += `
            <div class="mb-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Professional Summary</h2>
                <p class="text-gray-700 leading-relaxed">${data.personalInfo.summary}</p>
            </div>
        `;
    }

    // Work Experience
    if (data.experiences.length > 0) {
        html += `
            <div class="mb-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Work Experience</h2>
                <div class="space-y-4">
        `;
        
        data.experiences.forEach(exp => {
            const dateRange = formatDateRange(exp.startDate, exp.endDate);
            html += `
                <div>
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h3 class="font-semibold text-gray-900">${exp.title}</h3>
                            <p class="text-gray-600">${exp.company}</p>
                        </div>
                        ${dateRange ? `<span class="text-sm text-gray-500">${dateRange}</span>` : ''}
                    </div>
                    ${exp.description ? `
                        <div class="text-gray-700 text-sm space-y-1">
                            ${exp.description.split('\n').map(line => `<div>${line}</div>`).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    }

    // Education
    if (data.education.length > 0) {
        html += `
            <div class="mb-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Education</h2>
                <div class="space-y-4">
        `;
        
        data.education.forEach(edu => {
            html += `
                <div>
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="font-semibold text-gray-900">${edu.degree} in ${edu.field}</h3>
                            <p class="text-gray-600">${edu.school}</p>
                            ${edu.gpa ? `<p class="text-sm text-gray-600 mt-1">GPA: ${edu.gpa}</p>` : ''}
                        </div>
                        ${edu.year ? `<span class="text-sm text-gray-500">${edu.year}</span>` : ''}
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    }

    // Skills
    if (data.skills) {
        const skillsArray = data.skills.split(',').map(skill => skill.trim()).filter(Boolean);
        if (skillsArray.length > 0) {
            html += `
                <div>
                    <h2 class="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Skills</h2>
                    <div class="flex flex-wrap gap-2">
                        ${skillsArray.map(skill => `
                            <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">${skill}</span>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    }

    // If no content, show placeholder
    if (!html) {
        html = `
            <div class="text-center py-12 text-gray-500">
                <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p>Start filling out the form to see your resume preview</p>
            </div>
        `;
    }

    preview.innerHTML = html;
}

// Collect form data
function collectFormData() {
    const data = {
        personalInfo: {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value,
            summary: document.getElementById('summary').value
        },
        experiences: [],
        education: [],
        skills: document.getElementById('skills').value
    };

    // Collect experiences
    const experienceInputs = document.querySelectorAll('.experience-input');
    const experienceData = {};
    
    experienceInputs.forEach(input => {
        const index = input.dataset.index;
        const field = input.dataset.field;
        
        if (!experienceData[index]) {
            experienceData[index] = {};
        }
        experienceData[index][field] = input.value;
    });

    // Convert to array and filter out empty experiences
    Object.values(experienceData).forEach(exp => {
        if (exp.title && exp.company) {
            data.experiences.push(exp);
        }
    });

    // Collect education
    const educationInputs = document.querySelectorAll('.education-input');
    const educationData = {};
    
    educationInputs.forEach(input => {
        const index = input.dataset.index;
        const field = input.dataset.field;
        
        if (!educationData[index]) {
            educationData[index] = {};
        }
        educationData[index][field] = input.value;
    });

    // Convert to array and filter out empty education
    Object.values(educationData).forEach(edu => {
        if (edu.degree && edu.field && edu.school) {
            data.education.push(edu);
        }
    });

    return data;
}

// Format date range
function formatDateRange(startDate, endDate) {
    if (!startDate && !endDate) return '';
    
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    };

    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : 'Present';
    
    return `${start} - ${end}`;
}

// Update progress indicator
function updateProgress() {
    const data = collectFormData();
    let completed = 0;
    const total = 4;

    // Personal info (required fields)
    if (data.personalInfo.firstName && data.personalInfo.lastName && data.personalInfo.email) {
        completed++;
    }

    // Experience
    if (data.experiences.length > 0) {
        completed++;
    }

    // Education
    if (data.education.length > 0) {
        completed++;
    }

    // Skills
    if (data.skills) {
        completed++;
    }

    const percentage = Math.round((completed / total) * 100);
    
    document.getElementById('progress-bar').style.width = `${percentage}%`;
    document.getElementById('progress-text').textContent = `${percentage}% Complete`;
}

// Generate and download PDF
async function generatePDF() {
    const data = collectFormData();
    
    // Basic validation
    if (!data.personalInfo.firstName || !data.personalInfo.lastName || !data.personalInfo.email) {
        showToast('Please fill in all required fields before downloading.', 'error');
        return;
    }

    const downloadBtn = document.getElementById('downloadPDF');
    const downloadText = document.getElementById('downloadText');
    
    // Show loading state
    downloadBtn.disabled = true;
    downloadText.innerHTML = `
        <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        Generating...
    `;

    try {
        // Simulate processing time for better UX
        await new Promise(resolve => setTimeout(resolve, 1500));

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        let yPosition = 20;
        const pageWidth = doc.internal.pageSize.getWidth();
        const margins = { left: 20, right: 20 };

        // Header
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        const fullName = `${data.personalInfo.firstName} ${data.personalInfo.lastName}`;
        doc.text(fullName, margins.left, yPosition);
        yPosition += 8;

        // Contact info
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        const contactInfo = [
            data.personalInfo.email,
            data.personalInfo.phone,
            data.personalInfo.location
        ].filter(Boolean).join(' | ');
        
        doc.text(contactInfo, margins.left, yPosition);
        yPosition += 15;

        // Horizontal line
        doc.setDrawColor(200, 200, 200);
        doc.line(margins.left, yPosition, pageWidth - margins.right, yPosition);
        yPosition += 10;

        // Professional Summary
        if (data.personalInfo.summary) {
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('PROFESSIONAL SUMMARY', margins.left, yPosition);
            yPosition += 8;

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            const summaryLines = doc.splitTextToSize(data.personalInfo.summary, pageWidth - margins.left - margins.right);
            doc.text(summaryLines, margins.left, yPosition);
            yPosition += summaryLines.length * 5 + 8;
        }

        // Work Experience
        if (data.experiences.length > 0) {
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('WORK EXPERIENCE', margins.left, yPosition);
            yPosition += 10;

            data.experiences.forEach(exp => {
                // Job title and company
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.text(exp.title, margins.left, yPosition);
                
                // Date range (right aligned)
                if (exp.startDate || exp.endDate) {
                    const dateRange = formatDateRange(exp.startDate, exp.endDate);
                    const dateWidth = doc.getTextWidth(dateRange);
                    doc.text(dateRange, pageWidth - margins.right - dateWidth, yPosition);
                }
                yPosition += 6;

                doc.setFont('helvetica', 'normal');
                doc.text(exp.company, margins.left, yPosition);
                yPosition += 8;

                // Description
                if (exp.description) {
                    doc.setFontSize(10);
                    const descLines = exp.description.split('\n').filter(line => line.trim());
                    descLines.forEach(line => {
                        doc.text(line, margins.left, yPosition);
                        yPosition += 4;
                    });
                }
                yPosition += 6;
            });
        }

        // Education
        if (data.education.length > 0) {
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('EDUCATION', margins.left, yPosition);
            yPosition += 10;

            data.education.forEach(edu => {
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                const degree = `${edu.degree} in ${edu.field}`;
                doc.text(degree, margins.left, yPosition);
                
                // Year (right aligned)
                if (edu.year) {
                    const yearWidth = doc.getTextWidth(edu.year);
                    doc.text(edu.year, pageWidth - margins.right - yearWidth, yPosition);
                }
                yPosition += 6;

                doc.setFont('helvetica', 'normal');
                doc.text(edu.school, margins.left, yPosition);
                yPosition += 4;

                if (edu.gpa) {
                    doc.text(`GPA: ${edu.gpa}`, margins.left, yPosition);
                    yPosition += 4;
                }
                yPosition += 6;
            });
        }

        // Skills
        if (data.skills) {
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('SKILLS', margins.left, yPosition);
            yPosition += 8;

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            const skillsArray = data.skills.split(',').map(skill => skill.trim()).filter(Boolean);
            const skillsText = skillsArray.join(' • ');
            const lines = doc.splitTextToSize(skillsText, pageWidth - margins.left - margins.right);
            doc.text(lines, margins.left, yPosition);
        }

        // Download the PDF
        const fileName = `${data.personalInfo.firstName}_${data.personalInfo.lastName}_Resume.pdf`;
        doc.save(fileName);
        
        showToast('Resume downloaded successfully!', 'success');

    } catch (error) {
        console.error('PDF generation failed:', error);
        showToast('PDF generation failed. Please try again.', 'error');
    } finally {
        // Reset button state
        downloadBtn.disabled = false;
        downloadText.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Download PDF
        `;
    }
}

// Show toast notification
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toastId = `toast-${Date.now()}`;
    
    const bgColor = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600';
    
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `${bgColor} text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full opacity-0`;
    toast.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button onclick="removeToast('${toastId}')" class="ml-4 text-white hover:text-gray-200">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-x-full', 'opacity-0');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeToast(toastId);
    }, 5000);
}

// Remove toast notification
function removeToast(toastId) {
    const toast = document.getElementById(toastId);
    if (toast) {
        toast.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }
}