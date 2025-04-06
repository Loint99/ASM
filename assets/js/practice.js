// Practice Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize CodeMirror editor
    const codeEditor = document.getElementById('codeEditor');
    if (codeEditor) {
        const editor = CodeMirror.fromTextArea(codeEditor, {
            mode: 'python',
            theme: 'dracula',
            lineNumbers: true,
            indentUnit: 4,
            tabSize: 4,
            lineWrapping: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            extraKeys: {
                'Tab': 'indentMore',
                'Shift-Tab': 'indentLess'
            }
        });
        
        // Language selector change
        const languageSelects = document.querySelectorAll('.language-select');
        languageSelects.forEach(select => {
            select.addEventListener('change', function() {
                const language = this.value;
                let mode;
                
                switch (language) {
                    case 'python':
                        mode = 'python';
                        break;
                    case 'javascript':
                        mode = 'javascript';
                        break;
                    case 'java':
                    case 'csharp':
                    case 'cpp':
                        mode = 'text/x-java'; // Use Java mode for C-like languages
                        break;
                    default:
                        mode = 'python';
                }
                
                editor.setOption('mode', mode);
                
                // Update placeholder text based on language
                let placeholderText = '';
                switch (language) {
                    case 'python':
                        placeholderText = 'def reverse_string(s):\n    # Viết code của bạn ở đây\n    pass';
                        break;
                    case 'javascript':
                        placeholderText = 'function reverseString(s) {\n    // Viết code của bạn ở đây\n}';
                        break;
                    case 'java':
                        placeholderText = 'public class Solution {\n    public String reverseString(String s) {\n        // Viết code của bạn ở đây\n    }\n}';
                        break;
                    case 'csharp':
                        placeholderText = 'public class Solution {\n    public string ReverseString(string s) {\n        // Viết code của bạn ở đây\n    }\n}';
                        break;
                    case 'cpp':
                        placeholderText = 'class Solution {\npublic:\n    string reverseString(string s) {\n        // Viết code của bạn ở đây\n    }\n};';
                        break;
                }
                
                editor.setValue(placeholderText);
            });
        });
        
        // Run button click
        const runButton = document.querySelector('.toolbar-buttons .btn-primary');
        if (runButton) {
            runButton.addEventListener('click', function() {
                const outputContent = document.querySelector('.output-content');
                if (outputContent) {
                    outputContent.innerHTML = '<p>Chương trình đang chạy...</p>';
                    
                    // Simulate running code
                    setTimeout(() => {
                        outputContent.innerHTML = `
                            <p><strong>Kết quả:</strong> olleh</p>
                            <p><strong>Thời gian chạy:</strong> 0.002s</p>
                            <p><strong>Bộ nhớ sử dụng:</strong> 5.6MB</p>
                        `;
                    }, 1000);
                }
            });
        }
        
        // Submit button click
        const submitButton = document.querySelector('.toolbar-buttons .btn-success');
        if (submitButton) {
            submitButton.addEventListener('click', function() {
                const outputContent = document.querySelector('.output-content');
                if (outputContent) {
                    outputContent.innerHTML = '<p>Đang nộp bài...</p>';
                    
                    // Simulate submission
                    setTimeout(() => {
                        outputContent.innerHTML = `
                            <p><strong>Kết quả:</strong> Tất cả test cases đã pass!</p>
                            <p><strong>Điểm số:</strong> +10</p>
                            <p><strong>Tổng điểm:</strong> 1,260</p>
                            <p class="success"><i class="fas fa-check-circle"></i> Bài làm của bạn đã được lưu</p>
                        `;
                    }, 1500);
                }
            });
        }
    }
    
    // Test case switching
    const testCases = document.querySelectorAll('.test-case');
    testCases.forEach(testCase => {
        testCase.addEventListener('click', function() {
            testCases.forEach(tc => tc.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, this would load the test case details
        });
    });
});