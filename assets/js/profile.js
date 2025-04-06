// Profile Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Avatar upload
    const avatarInput = document.getElementById('avatarInput');
    const avatarPreview = document.getElementById('avatarPreview');
    const changeAvatar = document.getElementById('changeAvatar');
    const removeAvatar = document.getElementById('removeAvatar');
    
    if (changeAvatar && avatarInput && avatarPreview) {
        changeAvatar.addEventListener('click', function() {
            avatarInput.click();
        });
        
        avatarInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    avatarPreview.src = e.target.result;
                }
                
                reader.readAsDataURL(file);
            }
        });
    }
    
    if (removeAvatar) {
        removeAvatar.addEventListener('click', function() {
            if (avatarPreview) {
                avatarPreview.src = 'assets/images/default-avatar.jpg';
            }
            if (avatarInput) {
                avatarInput.value = '';
            }
        });
    }
    
    // Skill level bars animation
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
    
    // Add skill button
    const addSkillBtn = document.querySelector('.btn-add-skill');
    if (addSkillBtn) {
        addSkillBtn.addEventListener('click', function() {
            const skillsList = document.querySelector('.skills-list');
            if (skillsList) {
                const newSkill = document.createElement('li');
                newSkill.className = 'skill-item';
                newSkill.innerHTML = `
                    <span>Kỹ năng mới</span>
                    <div class="skill-bar">
                        <div class="skill-level" style="width: 50%"></div>
                    </div>
                `;
                skillsList.appendChild(newSkill);
                
                // Animate the new skill bar
                const newSkillBar = newSkill.querySelector('.skill-level');
                newSkillBar.style.width = '0';
                setTimeout(() => {
                    newSkillBar.style.width = '50%';
                }, 100);
            }
        });
    }
});