import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private UserDAO userDao = new UserDAO();
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String fullName = request.getParameter("fullName");
        String studentId = request.getParameter("studentId");
        
        // Check if username already exists
        if (userDao.usernameExists(username)) {
            response.sendRedirect("register.html?error=1");
            return;
        }
        
        // Create new user
        User newUser = new User(username, password, fullName, studentId, "student");
        boolean success = userDao.register(newUser);
        
        if (success) {
            response.sendRedirect("login.html?success=1");
        } else {
            response.sendRedirect("register.html?error=1");
        }
    }
}