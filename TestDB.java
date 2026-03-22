import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/edit-profile")
public class EditProfileServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private UserDAO userDao = new UserDAO();
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        HttpSession session = request.getSession(false);
        if (session == null) {
            response.sendRedirect("login.html");
            return;
        }
        
        User currentUser = (User) session.getAttribute("user");
        if (currentUser == null) {
            response.sendRedirect("login.html");
            return;
        }
        
        // Get form parameters
        String fullName = request.getParameter("fullName");
        String studentId = request.getParameter("studentId");
        String currentPassword = request.getParameter("currentPassword");
        String newPassword = request.getParameter("newPassword");
        
        // Validate current user
        User validatedUser = userDao.login(currentUser.getUsername(), currentPassword);
        if (validatedUser == null) {
            response.getWriter().write("{\"success\": false, \"message\": \"Current password is incorrect\"}");
            return;
        }
        
        // Update user profile
        boolean success = userDao.updateProfile(currentUser.getId(), fullName, studentId, 
                                              newPassword.isEmpty() ? null : newPassword);
        
        if (success) {
            // Update session with new data
            User updatedUser = userDao.getUserById(currentUser.getId());
            session.setAttribute("user", updatedUser);
            response.getWriter().write("{\"success\": true, \"message\": \"Profile updated successfully\"}");
        } else {
            response.getWriter().write("{\"success\": false, \"message\": \"Failed to update profile\"}");
        }
    }
}