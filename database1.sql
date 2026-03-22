<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - AUS Sports Hub</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --aus-maroon: #7B1624;
            --aus-maroon-dark: #5A0F18;
            --aus-gold: #CBAA2C;
            --aus-teal: #4a9b8e;
            --aus-dark: #1a1a1a;
            --aus-light: #f8f9fa;
            --aus-white: #ffffff;
            --aus-gray: #6c757d;
            --aus-border: #e9ecef;
            --aus-success: #28a745;
            --aus-warning: #ffc107;
            --aus-danger: #dc3545;
        }

        body {
            background: linear-gradient(135deg, rgba(123, 22, 36, 0.9) 0%, rgba(90, 15, 24, 0.85) 100%);
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            padding: 1rem;
        }
        
        .login-container {
            background: var(--aus-white);
            border-radius: 16px;
            padding: 2.5rem;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            width: 100%;
            max-width: 400px;
            border: 1px solid var(--aus-border);
            opacity: 0;
            transform: translateY(30px);
            animation: slideInUp 0.6s ease forwards;
        }
        
        .logo {
            text-align: center;
            margin-bottom: 2rem;
            color: var(--aus-maroon);
        }
        
        .logo i {
            font-size: 3.5rem;
            margin-bottom: 1rem;
            color: var(--aus-maroon);
            filter: drop-shadow(0 4px 8px rgba(123, 22, 36, 0.3));
        }
        
        .logo h2 {
            font-weight: 800;
            margin-bottom: 0.5rem;
        }
        
        .logo p {
            color: var(--aus-gray);
            font-size: 1rem;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, var(--aus-maroon) 0%, var(--aus-maroon-dark) 100%);
            border: none;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(123, 22, 36, 0.3);
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(123, 22, 36, 0.4);
            background: linear-gradient(135deg, var(--aus-maroon-dark) 0%, var(--aus-maroon) 100%);
        }
        
        .form-control {
            border: 2px solid var(--aus-border);
            border-radius: 10px;
            padding: 0.75rem 1rem;
            transition: all 0.3s ease;
        }
        
        .form-control:focus {
            border-color: var(--aus-maroon);
            box-shadow: 0 0 0 0.2rem rgba(123, 22, 36, 0.1);
        }
        
        .form-label {
            font-weight: 600;
            color: var(--aus-dark);
            margin-bottom: 0.5rem;
        }
        
        .alert {
            border-radius: 10px;
            border: none;
            font-weight: 500;
        }
        
        .alert-danger {
            background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
            color: var(--aus-danger);
        }
        
        .alert-success {
            background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
            color: var(--aus-success);
        }
        
        .text-decoration-none {
            color: var(--aus-maroon);
            font-weight: 600;
            transition: color 0.3s ease;
        }
        
        .text-decoration-none:hover {
            color: var(--aus-maroon-dark);
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @media (max-width: 768px) {
    .navbar-collapse {
        background: linear-gradient(135deg, var(--aus-maroon) 0%, var(--aus-maroon-dark) 100%);
        padding: 1rem;
        border-radius: 0 0 10px 10px;
        margin-top: 10px;
    }
    
    .navbar-nav .nav-item {
        margin: 5px 0;
    }
    
    .navbar-toggler {
        border: none;
        padding: 4px 8px;
    }
    
    .navbar-toggler:focus {
        box-shadow: none;
    }
}

.d-mobile-block { display: block !important; }
.d-mobile-none { display: none !important; }
.d-tablet-block { display: block !important; }
.d-tablet-none { display: none !important; }

@media (max-width: 768px) {
    .d-mobile-block { display: block !important; }
    .d-mobile-none { display: none !important; }
    .d-tablet-block { display: block !important; }
    .d-tablet-none { display: none !important; }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .d-mobile-block { display: block !important; }
    .d-mobile-none { display: none !important; }
    .d-tablet-block { display: block !important; }
    .d-tablet-none { display: none !important; }
}

.text-mobile-center { text-align: center !important; }
.text-mobile-left { text-align: left !important; }
.text-mobile-right { text-align: right !important; }

@media (max-width: 768px) {
    .text-mobile-center { text-align: center !important; }
    .text-mobile-left { text-align: left !important; }
    .text-mobile-right { text-align: right !important; }
}
    </style>
</head>
<body>
    <div class="login-container">
        <div class="logo">
            <i class="fas fa-running"></i>
            <h2>AUS Sports Hub</h2>
            <p class="text-muted">Login to your account</p>
        </div>
        
        <div id="errorAlert" class="alert alert-danger d-none" role="alert">
            <i class="fas fa-exclamation-triangle me-2"></i>
            Invalid username or password. Please try again.
        </div>
        
        <div id="successAlert" class="alert alert-success d-none" role="alert">
            <i class="fas fa-check-circle me-2"></i>
            Registration successful! Please login.
        </div>
        
        <form action="login" method="POST">
            <div class="mb-3">
                <label for="username" class="form-label">AUS Email</label>
                <input type="email" class="form-control" id="username" name="username" 
                       placeholder="your-email@aus.edu" required>
            </div>
            
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" 
                       placeholder="Enter your password" required>
            </div>
            
            <button type="submit" class="btn btn-primary w-100 mb-3">
                <i class="fas fa-sign-in-alt me-2"></i>Login
            </button>
            
            <div class="text-center">
                <p class="mb-0 text-muted">Don't have an account? 
                    <a href="register.html" class="text-decoration-none">Register here</a>
                </p>
            </div>
        </form>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        (function () {
            const params = new URLSearchParams(window.location.search);
            const error = params.get('error');
            const success = params.get('success');

            const errorAlert = document.getElementById('errorAlert');
            const successAlert = document.getElementById('successAlert');

            if (error && errorAlert) {
                errorAlert.classList.remove('d-none');
            }

            if (success && successAlert) {
                successAlert.classList.remove('d-none');
            }
        })();
    </script>
</body>
</html>